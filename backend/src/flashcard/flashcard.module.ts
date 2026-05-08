import { Module } from "@nestjs/common";
import { FlashcardController } from "./flashcard.controller";
import { FlashcardService } from "./flashcard.service";
import { DeckModule } from "src/deck/deck.module";

@Module({
  imports: [DeckModule],
  controllers: [FlashcardController],
  providers: [FlashcardService],
})
export class FlashcardModule {}
