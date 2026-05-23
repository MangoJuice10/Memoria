import { Injectable } from "@nestjs/common";
import { VectorStoreService } from "src/vector-store/vector-store.service";
import { RagCitation, RagResult } from "src/rag/types";

@Injectable()
export class RagService {
  constructor(private readonly vectorStoreService: VectorStoreService) {}

  async retrieve(query: string, educationalResourceIds: number[]): Promise<RagResult> {
    const chunks = await this.vectorStoreService.search(query, educationalResourceIds);

    if (!chunks.length)
      return {
        context: "",
        citations: [],
      };

    const citations: RagCitation[] = chunks.map((chunk, idx) => ({
      id: `C${idx + 1}`,
      score: chunk.score,
      ...chunk.metadata,
    }));

    const context = chunks
      .map((chunk, idx) =>
        [
          `[${citations[idx].id}] Educational resource: ${chunk.metadata.educationalResourceName}`,
          `File: ${chunk.metadata.educationalResourceOriginalFilename}`,
          `Chunk: ${chunk.metadata.chunkIdx}`,
          chunk.content,
        ].join("\n"),
      )
      .join("\n\n---\n\n");

    return { context, citations };
  }
}
