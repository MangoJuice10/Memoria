import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Flashcard } from '@prisma/client';
import { FlashcardPhase } from '../enums/flashcard-phase.enum';

@Injectable()
export class FlashcardPhaseService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get phase for a single flashcard
   */
  async getPhase(flashcard: Flashcard): Promise<FlashcardPhase> {
    // Guard clause: Check if card has ever been reviewed
    const reviewCount = await this.prisma.review.count({
      where: { flashcardId: flashcard.id },
    });

    if (reviewCount === 0) {
      return FlashcardPhase.NEW;
    }

    // Derive phase from repetitions and lapses
    if (flashcard.repetitions >= 3) {
      return FlashcardPhase.REVIEW;
    }

    if (flashcard.lapses > 0) {
      return FlashcardPhase.RELEARNING;
    }

    return FlashcardPhase.LEARNING;
  }

  /**
   * Get phases for multiple flashcards (batch operation for better performance)
   */
  async getPhasesForFlashcards(
    flashcards: Flashcard[],
  ): Promise<Map<number, FlashcardPhase>> {
    const flashcardIds = flashcards.map((f) => f.id);

    // Batch query: Get review counts for all flashcards at once
    const reviewCounts = await this.prisma.review.groupBy({
      by: ['flashcardId'],
      where: { flashcardId: { in: flashcardIds } },
      _count: { id: true },
    });

    const countMap = new Map(
      reviewCounts.map((r) => [r.flashcardId, r._count.id]),
    );

    const phaseMap = new Map<number, FlashcardPhase>();

    for (const flashcard of flashcards) {
      const reviewCount = countMap.get(flashcard.id) || 0;

      if (reviewCount === 0) {
        phaseMap.set(flashcard.id, FlashcardPhase.NEW);
      } else if (flashcard.repetitions >= 3) {
        phaseMap.set(flashcard.id, FlashcardPhase.REVIEW);
      } else if (flashcard.lapses > 0) {
        phaseMap.set(flashcard.id, FlashcardPhase.RELEARNING);
      } else {
        phaseMap.set(flashcard.id, FlashcardPhase.LEARNING);
      }
    }

    return phaseMap;
  }
}
