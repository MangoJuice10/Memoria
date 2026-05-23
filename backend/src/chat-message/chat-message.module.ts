import { Module } from "@nestjs/common";
import { ChatMessageController } from "./chat-message.controller";
import { ChatMessageService } from "./chat-message.service";
import { LargeLanguageModelModule } from "src/large-language-model/large-language-model.module";
import { RagModule } from "src/rag/rag.module";

@Module({
  imports: [LargeLanguageModelModule, RagModule],
  controllers: [ChatMessageController],
  providers: [ChatMessageService],
})
export class ChatMessageModule {}
