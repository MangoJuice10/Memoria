import { PrismaClient, ReviewRating } from '@prisma/client';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export async function seedReviews(prisma: PrismaClient) {
  console.log('📊 Создание истории повторений...\n');

  const flashcards = await prisma.flashcard.findMany();

  if (flashcards.length === 0) {
    console.log('⚠️  Нет карточек в базе. Сначала запустите seed-decks-flashcards');
    return 0;
  }

  let totalReviews = 0;

  for (const flashcard of flashcards) {
    // Only create reviews for cards that have been reviewed
    if (flashcard.repetitions === 0 && flashcard.lapses === 0) {
      continue;
    }

    // Calculate number of reviews based on repetitions and lapses
    const totalReviewCount = flashcard.repetitions + flashcard.lapses * 2;
    const reviewsToCreate = Math.min(totalReviewCount, randomInt(3, 15));

    const now = new Date();
    const cardAge = now.getTime() - flashcard.createdAt.getTime();
    const startDate = new Date(flashcard.createdAt.getTime() + cardAge * 0.1);

    for (let i = 0; i < reviewsToCreate; i++) {
      const reviewDate = randomDate(startDate, now);
      const startedAt = new Date(reviewDate.getTime() - randomInt(3000, 45000));

      // Simulate realistic learning progression
      const progress = i / reviewsToCreate;
      let rating: ReviewRating;

      if (progress < 0.3) {
        // Early reviews: more mistakes
        const rand = Math.random();
        if (rand < 0.25) rating = ReviewRating.AGAIN;
        else if (rand < 0.50) rating = ReviewRating.BAD;
        else if (rand < 0.80) rating = ReviewRating.GOOD;
        else rating = ReviewRating.PERFECT;
      } else if (progress < 0.7) {
        // Middle reviews: improving
        const rand = Math.random();
        if (rand < 0.10) rating = ReviewRating.AGAIN;
        else if (rand < 0.25) rating = ReviewRating.BAD;
        else if (rand < 0.70) rating = ReviewRating.GOOD;
        else rating = ReviewRating.PERFECT;
      } else {
        // Later reviews: mostly good
        const rand = Math.random();
        if (rand < 0.05) rating = ReviewRating.AGAIN;
        else if (rand < 0.15) rating = ReviewRating.BAD;
        else if (rand < 0.55) rating = ReviewRating.GOOD;
        else rating = ReviewRating.PERFECT;
      }

      // Calculate realistic old interval based on review index
      let oldIntervalDays = 0;
      if (i === 0) {
        oldIntervalDays = 0;
      } else if (i === 1) {
        oldIntervalDays = 1;
      } else if (i === 2) {
        oldIntervalDays = 6;
      } else {
        oldIntervalDays = Math.ceil(Math.pow(1.8, i - 1));
      }

      const oldEaseFactor = 2.3 + Math.random() * 0.4;

      await prisma.review.create({
        data: {
          flashcardId: flashcard.id,
          rating,
          startedAt,
          endedAt: reviewDate,
          oldIntervalDays,
          oldEaseFactor,
        },
      });
      totalReviews++;
    }
  }

  console.log(`✅ Создано ${totalReviews} записей повторений\n`);
  return totalReviews;
}
