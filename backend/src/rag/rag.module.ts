import { Module } from "@nestjs/common";
import { RagService } from "./rag.service";
import { VectorStoreModule } from "src/vector-store/vector-store.module";

@Module({
  imports: [VectorStoreModule],
  providers: [RagService],
  exports: [RagService],
})
export class RagModule {}
