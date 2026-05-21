import { Injectable, OnModuleInit } from "@nestjs/common";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmbeddingsService implements OnModuleInit {
  private embeddingsModel: HuggingFaceInferenceEmbeddings;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const apiKey = this.configService.get("HUGGINGFACE_API_KEY") as string;
    this.embeddingsModel = new HuggingFaceInferenceEmbeddings({
      apiKey,
      model: this.configService.get("HUGGINGFACE_EMBEDDING_MODEL"),
    });
  }

  getEmbeddings(): HuggingFaceInferenceEmbeddings {
    return this.embeddingsModel;
  }

  async embedQuery(text: string): Promise<number[]> {
    return this.embeddingsModel.embedQuery(text);
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    return this.embeddingsModel.embedDocuments(texts);
  }
}
