import { Module } from "@nestjs/common";
import { ChatMessageController } from "./chat-message.controller";
import { ChatMessageService } from "./chat-message.service";
import { LargeLanguageModelModule } from "src/large-language-model/large-language-model.module";
import { RagModule } from "src/rag/rag.module";
import {
  createFlashcardQueryRewritePrompt,
  FLASHCARD_QUERY_REWRITE_PROMPT,
} from "src/flashcard/providers";

@Module({
  imports: [LargeLanguageModelModule, RagModule],
  controllers: [ChatMessageController],
  providers: [
    ChatMessageService,
    {
      provide: FLASHCARD_QUERY_REWRITE_PROMPT,
      useValue: createFlashcardQueryRewritePrompt,
    },
  ],
})
export class ChatMessageModule {}
