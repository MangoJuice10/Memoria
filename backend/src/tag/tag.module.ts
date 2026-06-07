import { Module } from "@nestjs/common";
import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";
import { DeckModule } from "src/deck/deck.module";
import { FeedbackModule } from "src/feedback/feedback.module";

@Module({
  imports: [DeckModule, FeedbackModule],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
