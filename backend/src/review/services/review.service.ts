import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Sm2Service } from "src/review/services/sm2.service";
import { ReviewDto } from "src/review/schemas";
import { FlashcardNotFoundError } from "src/flashcard/errors";
import { REVIEW_RATING_TO_QUALITY } from "src/review/constants/spaced-repetition.constants";

@Injectable()
export class ReviewService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly sm2Service: Sm2Service,
  ) {}

  async findNextDueFlashcard(deckId: number) {
    return this.prismaService.flashcard.findFirst({
      where: {
        deckId,
        dueAt: {
          lte: new Date(),
        },
      },
      orderBy: [{ dueAt: "asc" }, { id: "asc" }],
    });
  }

  async findAllDueFlashcards(deckId: number) {
    return this.prismaService.flashcard.findMany({
      where: {
        deckId,
        dueAt: {
          lte: new Date(),
        },
      },
      orderBy: [{ dueAt: "asc" }, { id: "asc" }],
    });
  }

  async review(flashcardId: number, { rating, startedAt }: ReviewDto) {
    const flashcard = await this.prismaService.flashcard.findUnique({
      where: {
        id: flashcardId,
      },
    });
    if (!flashcard) throw new FlashcardNotFoundError();

    const now = new Date();

    const oldRepetitions = flashcard.repetitions;
    const oldIntervalDays = flashcard.intervalDays;
    const oldEaseFactor = flashcard.easeFactor;

    const quality = REVIEW_RATING_TO_QUALITY[rating];

    const newSchedulingState = this.sm2Service.schedule(
      {
        repetitions: flashcard.repetitions,
        intervalDays: flashcard.intervalDays,
        easeFactor: flashcard.easeFactor,
        dueAt: flashcard.dueAt,
      },
      quality,
      now,
    );

    const oldLapses = flashcard.lapses;
    const isLapse = quality < 3 && oldRepetitions >= 3;

    const newLapses = isLapse ? oldLapses + 1 : oldLapses;

    return this.prismaService.$transaction(async (tx) => {

      const updatedFlashcard = await tx.flashcard.update({
        where: {
          id: flashcardId,
        },
        data: {
          ...newSchedulingState,
          lapses: newLapses,
        },
      });

      await tx.review.create({
        data: {
          flashcardId,
          rating,
          startedAt: new Date(startedAt),
          endedAt: now,
          oldIntervalDays,
          oldEaseFactor,
        },
      });

      return updatedFlashcard;
    });
  }
}
