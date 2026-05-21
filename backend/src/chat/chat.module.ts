import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { LargeLanguageModelModule } from "src/large-language-model/large-language-model.module";
import { RagModule } from "src/rag/rag.module";
import { EducationalResourceModule } from "src/educational-resource/educational-resource.module";

@Module({
  imports: [LargeLanguageModelModule, RagModule],
  providers: [ChatService],
})
export class ChatModule {}
