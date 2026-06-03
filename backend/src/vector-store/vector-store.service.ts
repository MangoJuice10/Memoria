import { Injectable, OnModuleInit } from "@nestjs/common";
import { QdrantVectorStore } from "@langchain/qdrant";
import { EmbeddingsService } from "src/embeddings/embeddings.service";
import { ConfigService } from "@nestjs/config";
import { Document } from "@langchain/core/documents";
import { EducationalResource } from "@prisma/client";
import { EducationalResourceMetadata } from "src/educational-resource/types";

const COLLECTION = "educational-resources";
const DEFAULT_TOP_K = 10;
const DEFAULT_FETCH_K = 30;
const DEFAULT_MIN_SCORE = 0.2;

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

  private readonly EMBEDDINGS_BATCH_SIZE = 32;

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

    for (let i = 0; i < documents.length; i += this.EMBEDDINGS_BATCH_SIZE) {
      const batch = documents.slice(i, i + this.EMBEDDINGS_BATCH_SIZE);
      const vectors = await this.embeddingsService.embedDocuments(
        batch.map(({ pageContent }) => pageContent),
      );
      await this.vectorStore.addVectors(vectors, batch, {
        ids: batch.map(() => crypto.randomUUID()),
      });
    }
  }

  async search(
    query: string,
    educationalResourceIds: number[],
    topK = DEFAULT_TOP_K,
    fetchK = DEFAULT_FETCH_K,
    minScore = DEFAULT_MIN_SCORE,
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
      .sort((chunkA, chunkB) => chunkB.score - chunkA.score)
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

  async cleanCollection() {
    await this.vectorStore.client.delete(COLLECTION, {
      filter: {},
    });
  }
}
