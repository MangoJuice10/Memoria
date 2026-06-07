import { Module } from "@nestjs/common";
import { FeedbackController } from "src/feedback/feedback.controller";
import { FeedbackService } from "src/feedback/feedback.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [FeedbackController],
  providers: [FeedbackService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
