import { Module } from "@nestjs/common";
import { VectorStoreService } from "src/vector-store/vector-store.service";
import { EmbeddingsModule } from "src/embeddings/embeddings.module";

@Module({
  imports: [EmbeddingsModule],
  providers: [VectorStoreService],
  exports: [VectorStoreService]
})
export class VectorStoreModule {}
