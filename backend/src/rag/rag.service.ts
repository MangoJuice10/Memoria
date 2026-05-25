import { Injectable } from "@nestjs/common";
import { VectorStoreService } from "src/vector-store/vector-store.service";

@Injectable()
export class RagService {
  constructor(private readonly vectorStoreService: VectorStoreService) {}

  async retrieve(query: string, educationalResourceIds: number[]): Promise<string> {
    const chunks = await this.vectorStoreService.search(query, educationalResourceIds);

    if (!chunks.length) return "";

    return chunks
      .map((chunk) =>
        [
          `Educational resource: ${chunk.metadata.educationalResourceName}`,
          `File: ${chunk.metadata.educationalResourceOriginalFilename}`,
          chunk.content,
        ].join("\n"),
      )
      .join("\n\n---\n\n");
  }
}
