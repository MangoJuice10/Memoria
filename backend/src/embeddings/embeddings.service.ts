import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Embeddings } from "@langchain/core/embeddings";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { OllamaEmbeddings } from "@langchain/ollama";

@Injectable()
export class EmbeddingsService implements OnModuleInit {
  private embeddingsModel: Embeddings;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const apiKey = this.configService.get("HUGGINGFACE_API_KEY");
    const baseUrl = this.configService.get("OLLAMA_URL");

    this.embeddingsModel = new HuggingFaceInferenceEmbeddings({
      apiKey,
      model: this.configService.get("HUGGINGFACE_EMBEDDINGS_MODEL"),
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
