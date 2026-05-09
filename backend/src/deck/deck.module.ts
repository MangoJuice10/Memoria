import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DeckService } from "./deck.service";
import { DeckController } from "./deck.controller";
import { DeckValidationMiddleware } from "./middleware/deck-validation.middleware";

@Module({
  providers: [DeckService],
  controllers: [DeckController],
  exports: [DeckService],
})
export class DeckModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeckValidationMiddleware).forRoutes("decks/:deckId");
  }
}
