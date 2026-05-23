import { Injectable, OnModuleInit } from "@nestjs/common";
import { QdrantVectorStore } from "@langchain/qdrant";
import { EmbeddingsService } from "src/embeddings/embeddings.service";
import { ConfigService } from "@nestjs/config";
import { Document } from "@langchain/core/documents";
import { EducationalResource } from "@prisma/client";
import { EducationalResourceMetadata } from "src/educational-resource/types";

const COLLECTION = "educational-resources";

export type ChunkMetadata = EducationalResourceMetadata & {
  chunkIdx: number;
};

export type Chunk = {
  content: string;
  score: number;
  metadata: ChunkMetadata;
};

@Injectable()
export class VectorStoreService implements OnModuleInit {
  private vectorStore: QdrantVectorStore;

  constructor(
    private readonly embeddingsService: EmbeddingsService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    this.vectorStore = await QdrantVectorStore.fromExistingCollection(
      this.embeddingsService.getEmbeddings(),
      {
        url: this.configService.get("QDRANT_URL"),
        collectionName: COLLECTION,
      },
    );
  }

  async addDocuments(educationalResourceMetadata: EducationalResourceMetadata, chunks: string[]) {
    const documents = chunks
      .map((content) => content.trim())
      .filter(Boolean)
      .map(
        (pageContent, chunkIdx) =>
          new Document<ChunkMetadata>({
            pageContent,
            metadata: {
              ...educationalResourceMetadata,
              chunkIdx,
            },
          }),
      );

    // TODO: create a new error type
    if (!documents.length)
      throw new Error("The educational resource doesn't contain extractable text");

    const vectors = await this.embeddingsService.embedDocuments(
      documents.map(({ pageContent }) => pageContent),
    );

    await this.vectorStore.addVectors(vectors, documents, {
      ids: documents.map(() => crypto.randomUUID())
    });
  }

  async search(
    query: string,
    educationalResourceIds: number[],
    topK = 5,
    fetchK = 12,
    minScore = 0.7,
  ): Promise<Chunk[]> {
    if (!educationalResourceIds.length) return [];

    const queryVector = await this.embeddingsService.embedQuery(query);

    const results = await this.vectorStore.similaritySearchVectorWithScore(queryVector, fetchK, {
      must: [
        {
          key: "metadata.educationalResourceId",
          match: {
            any: educationalResourceIds,
          },
        },
      ],
    });

    return results
      .map(([document, score]) => ({
        content: document.pageContent,
        score,
        metadata: document.metadata as ChunkMetadata,
      }))
      .filter(({ score }) => score >= minScore)
      .sort((chunkA, chunkB) => chunkA.score - chunkB.score)
      .slice(0, topK);
  }

  async deleteByResourceId(educationalResourceId: number) {
    const client = this.vectorStore.client;
    await client.delete(COLLECTION, {
      filter: {
        must: [
          {
            key: "metadata.educationalResourceId",
            match: {
              value: educationalResourceId,
            },
          },
        ],
      },
    });
  }
}
