import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { FlashcardController } from "./flashcard.controller";
import { FlashcardService } from "src/flashcard/services/flashcard.service";
import { DeckModule } from "src/deck/deck.module";
import { FlashcardValidationMiddleware } from "./middleware/flashcard-validation.middleware";
import { RagModule } from "src/rag/rag.module";
import { LargeLanguageModelModule } from "src/large-language-model/large-language-model.module";
import { FlashcardGenerationService } from "src/flashcard/services/flashcard-generation.service";
import {
  createFlashcardGenerationPrompt,
  createFlashcardQueryRewritePrompt,
  createFlashcardRegenerationPrompt,
  createFlashcardSplitPrompt,
  FLASHCARD_GENERATION_PROMPT,
  FLASHCARD_QUERY_REWRITE_PROMPT,
  FLASHCARD_REGENERATION_PROMPT,
  FLASHCARD_SPLIT_PROMPT,
} from "src/flashcard/providers";
import { createQueryRewritePrompt, QUERY_REWRITE_PROMPT } from "src/common/providers";

@Module({
  imports: [DeckModule, RagModule, LargeLanguageModelModule],
  controllers: [FlashcardController],
  providers: [
    FlashcardService,
    FlashcardGenerationService,
    {
      provide: FLASHCARD_GENERATION_PROMPT,
      useValue: createFlashcardGenerationPrompt,
    },
    {
      provide: FLASHCARD_REGENERATION_PROMPT,
      useValue: createFlashcardRegenerationPrompt,
    },
    {
      provide: FLASHCARD_SPLIT_PROMPT,
      useValue: createFlashcardSplitPrompt,
    },
    {
      provide: QUERY_REWRITE_PROMPT,
      useValue: createQueryRewritePrompt,
    },
    {
      provide: FLASHCARD_QUERY_REWRITE_PROMPT,
      useValue: createFlashcardQueryRewritePrompt,
    },
  ],
})
export class FlashcardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FlashcardValidationMiddleware)
      .exclude(
        {
          path: "decks/:deckId/flashcards/bulk",
          method: RequestMethod.POST,
        },
        {
          path: "decks/:deckId/flashcards/generate",
          method: RequestMethod.POST,
        },
        {
          path: "decks/:deckId/flashcards/batch",
          method: RequestMethod.POST,
        },
      )
      .forRoutes("decks/:deckId/flashcards/:flashcardId");
  }
}
