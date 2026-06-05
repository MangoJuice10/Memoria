import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ReviewService } from "src/review/services/review.service";
import { ZodValidationPipe } from "src/common";
import { reviewSchema, type ReviewDto } from "src/review/schemas";

@Controller("decks/:deckId/review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @HttpCode(200)
  async findAllDueFlashcards(@Param("deckId", ParseIntPipe) deckId: number) {
    return this.reviewService.findAllDueFlashcards(deckId);
  }

  @Get("next")
  @HttpCode(200)
  async findNextDueFlashcard(@Param("deckId", ParseIntPipe) deckId: number) {
    return this.reviewService.findNextDueFlashcard(deckId);
  }

  @Post(":flashcardId")
  @HttpCode(200)
  async reviewFlashcard(
    @Param("flashcardId", ParseIntPipe) flashcardId: number,
    @Body(new ZodValidationPipe(reviewSchema)) reviewDto: ReviewDto,
  ) {
    return this.reviewService.review(flashcardId, reviewDto);
  }
}
