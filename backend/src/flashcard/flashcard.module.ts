import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { FlashcardController } from "./flashcard.controller";
import { FlashcardService } from "./flashcard.service";
import { DeckModule } from "src/deck/deck.module";
import { FlashcardValidationMiddleware } from "./middleware/flashcard-validation.middleware";

@Module({
  imports: [DeckModule],
  controllers: [FlashcardController],
  providers: [FlashcardService],
})
export class FlashcardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FlashcardValidationMiddleware).forRoutes("decks/:deckId/flashcards/:flashcardId");
  }
}
