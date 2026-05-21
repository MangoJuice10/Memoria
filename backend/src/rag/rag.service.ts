import { Injectable } from "@nestjs/common";
import { VectorStoreService } from "src/vector-store/vector-store.service";

@Injectable()
export class RagService {
  constructor(private readonly vectorStoreService: VectorStoreService) {}

  async retrieve(query: string, educationalResourceIds: number[], topK = 5): Promise<string> {
    if (educationalResourceIds.length === 0) return "";

    const chunks = await this.vectorStoreService.similaritySearch(
      query,
      educationalResourceIds,
      topK,
    );
    return chunks.join("\n\n---\n\n");
  }
}
