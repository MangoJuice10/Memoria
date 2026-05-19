import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DeckService } from "./deck.service";
import { DeckController } from "./deck.controller";
import { DeckValidationMiddleware } from "./middleware/deck-validation.middleware";
import { StorageModule } from "src/storage/storage.module";

@Module({
  providers: [DeckService],
  controllers: [DeckController],
  imports: [StorageModule],
  exports: [DeckService],
})
export class DeckModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeckValidationMiddleware).forRoutes("decks/:deckId");
  }
}
