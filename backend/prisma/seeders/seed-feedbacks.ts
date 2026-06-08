import { PrismaClient } from '@prisma/client';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

const FEEDBACK_TEXTS = [
  'Отличная колода! Очень помогла в подготовке к экзамену.',
  'Качественный материал, всё чётко и по делу. Рекомендую!',
  'Хорошая подборка, но хотелось бы больше примеров.',
  'Спасибо за колоду! Структурировано и понятно.',
  'Очень полезная колода для изучения темы. Буду использовать регулярно.',
  'Отличное покрытие темы, ничего лишнего.',
  'Помогла систематизировать знания. Спасибо автору!',
  'Неплохо, но некоторые карточки можно было бы сформулировать точнее.',
  'Превосходная работа! Использую для повторения материала.',
  'Качественная колода для начинающих и не только.',
  'Очень помогла разобраться в теме. Рекомендую всем.',
  'Хорошая база для изучения. Буду ждать обновлений.',
  'Отличная колода для подготовки к собеседованиям.',
  'Помогла закрепить теоретический материал. Благодарю!',
  'Всё по существу, без воды. Именно то, что нужно.',
  'Хорошо структурированный материал. Легко запоминается.',
  'Спасибо за труд! Колода действительно полезная.',
  'Отличное дополнение к учебнику. Рекомендую.',
  'Помогла подготовиться к экзамену за короткое время.',
  'Качественная колода с академическим подходом.',
];

export async function seedFeedbacks(prisma: PrismaClient) {
  console.log('⭐ Создание отзывов...\n');

  const users = await prisma.user.findMany();
  const publicDecks = await prisma.deck.findMany({
    where: { isPublic: true },
  });

  if (users.length === 0) {
    console.log('⚠️  Нет пользователей в базе. Сначала запустите seed-users');
    return 0;
  }

  if (publicDecks.length === 0) {
    console.log('⚠️  Нет публичных колод. Сначала запустите seed-decks-flashcards');
    return 0;
  }

  let totalFeedbacks = 0;

  for (const deck of publicDecks) {
    // 70% chance to have feedbacks
    if (Math.random() > 0.7) continue;

    const numFeedbacks = randomInt(1, 5);
    const usedReviewerIds = new Set<number>();

    for (let i = 0; i < numFeedbacks; i++) {
      // Find a reviewer who hasn't reviewed this deck yet and is not the owner
      const availableReviewers = users.filter(
        u => u.id !== deck.userId && !usedReviewerIds.has(u.id)
      );

      if (availableReviewers.length === 0) break;

      const reviewer = randomElement(availableReviewers);
      usedReviewerIds.add(reviewer.id);

      // Rating distribution: mostly 4-5 stars
      const rand = Math.random();
      let rating: number;
      if (rand < 0.50) rating = 5;
      else if (rand < 0.85) rating = 4;
      else if (rand < 0.95) rating = 3;
      else rating = randomInt(2, 3);

      await prisma.feedback.create({
        data: {
          content: randomElement(FEEDBACK_TEXTS),
          rating,
          deckId: deck.id,
          userId: reviewer.id,
        },
      });
      totalFeedbacks++;
    }
  }

  console.log(`✅ Создано ${totalFeedbacks} отзывов\n`);
  return totalFeedbacks;
}
