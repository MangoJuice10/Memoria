import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { User } from "src/auth/decorators";
import { ZodValidationPipe } from "src/common";
import { FeedbackService } from "src/feedback/feedback.service";
import {
  createFeedbackSchema,
  type CreateFeedbackDto,
} from "src/feedback/schemas/create-feedback.schema";

@Controller("shared-decks/:sharedDeckId/feedback")
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  @HttpCode(200)
  async findByDeck(
    @Param("sharedDeckId", ParseIntPipe) sharedDeckId: number,
  ) {
    return this.feedbackService.findByDeck(sharedDeckId);
  }

  @Post()
  @HttpCode(201)
  async create(
    @Param("sharedDeckId", ParseIntPipe) sharedDeckId: number,
    @User("id") userId: number,
    @Body(new ZodValidationPipe(createFeedbackSchema)) dto: CreateFeedbackDto,
  ) {
    return this.feedbackService.create(sharedDeckId, userId, dto);
  }
}
