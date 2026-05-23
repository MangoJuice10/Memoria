import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Embeddings } from "@langchain/core/embeddings";
import { OllamaEmbeddings } from "@langchain/ollama";

@Injectable()
export class EmbeddingsService implements OnModuleInit {
  private embeddingsModel: Embeddings;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.embeddingsModel = new OllamaEmbeddings({
      baseUrl: this.configService.get("OLLAMA_URL"),
      model: this.configService.get("OLLAMA_EMBEDDINGS_MODEL"),
    });
  }

  getEmbeddings(): Embeddings {
    return this.embeddingsModel;
  }

  async embedQuery(text: string): Promise<number[]> {
    return this.embeddingsModel.embedQuery(text);
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    return this.embeddingsModel.embedDocuments(texts);
  }
}
