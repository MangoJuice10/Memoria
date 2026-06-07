import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { StorageModule } from "src/storage/storage.module";
import { FeedbackModule } from "src/feedback/feedback.module";
import { SharedDecksController } from "./shared-decks.controller";
import { SharedDecksService } from "./shared-decks.service";
import { DeckCopyService } from "./deck-copy.service";

@Module({
  imports: [PrismaModule, StorageModule, FeedbackModule],
  controllers: [SharedDecksController],
  providers: [SharedDecksService, DeckCopyService],
})
export class SharedDecksModule {}
