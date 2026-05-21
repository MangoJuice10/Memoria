import { Injectable, OnModuleInit } from "@nestjs/common";
import { QdrantVectorStore } from "@langchain/qdrant";
import { EmbeddingsService } from "src/embeddings/embeddings.service";
import { ConfigService } from "@nestjs/config";
import { Document } from "@langchain/core/documents";

const COLLECTION = "educational-resources";

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

  async addDocuments(educationalResourceId: number, chunks: string[]) {
    const texts = chunks.map(
      (text, idx) =>
        new Document({
          pageContent: text,
          metadata: {
            educationalResourceId,
            chunkIdx: idx,
          },
        }),
    );
    await this.vectorStore.addDocuments(texts);
  }

  async similaritySearch(
    query: string,
    educationalResourceIds: number[],
    topK = 5,
  ): Promise<string[]> {
    const results = await this.vectorStore.similaritySearch(query, topK, {
      must: [
        {
          key: "metadata.educationalResourceId",
          match: {
            any: educationalResourceIds,
          },
        },
      ],
    });

    return results.map(({ pageContent }) => pageContent);
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
