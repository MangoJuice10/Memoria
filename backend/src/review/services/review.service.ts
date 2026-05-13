import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Sm2Service } from "src/review/services/sm2.service";
import { ReviewFlashcardDto } from "src/review/schemas";
import { FlashcardNotFoundError } from "src/flashcard/errors";

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

  async reviewFlashcard(flashcardId: number, { rating }: ReviewFlashcardDto) {
    const flashcard = await this.prismaService.flashcard.findUnique({
      where: {
        id: flashcardId,
      },
    });
    if (!flashcard) throw new FlashcardNotFoundError();

    const now = new Date();

    const newFlashcardSchedulingState = this.sm2Service.schedule(
      {
        repetitions: flashcard.repetitions,
        intervalDays: flashcard.intervalDays,
        easeFactor: flashcard.easeFactor,
        dueAt: flashcard.dueAt,
      },
      rating,
      now,
    );

    return this.prismaService.$transaction(async (tx) => {
      const updatedFlashcard = await tx.flashcard.update({
        where: {
          id: flashcardId,
        },
        data: newFlashcardSchedulingState,
      });

      await tx.reviewHistory.create({
        data: {
          flashcardId,
          rating,
          reviewedAt: now,
        },
      });

      return updatedFlashcard;
    });
  }
}
