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
  FLASHCARD_GENERATION_PROMPT,
} from "src/flashcard/providers";

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
