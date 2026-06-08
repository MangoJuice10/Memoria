import { PrismaClient } from '@prisma/client';
import { DECK_DEFINITIONS } from './deck-definitions';

// SR parameter calculation helpers
function calculateValidSRParams(repetitions: number): {
  intervalDays: number;
  easeFactor: number;
  dueAt: Date;
} {
  const now = new Date();
  
  if (repetitions === 0) {
    // New cards
    return {
      intervalDays: 0,
      easeFactor: 2.5,
      dueAt: now,
    };
  } else if (repetitions === 1) {
    // First review - 1 day interval
    return {
      intervalDays: 1,
      easeFactor: 2.5,
      dueAt: addDays(now, 1),
    };
  } else if (repetitions === 2) {
    // Second review - 6 days interval
    return {
      intervalDays: 6,
      easeFactor: 2.3 + Math.random() * 0.4,
      dueAt: addDays(now, randomInt(-2, 8)),
    };
  } else {
    // Mature cards - use proper SM2 intervals
    const baseInterval = repetitions <= 5 
      ? Math.pow(2, repetitions) 
      : Math.pow(repetitions, 1.5);
    const intervalDays = Math.ceil(baseInterval * (1 + Math.random() * 0.3));
    const easeFactor = 2.0 + Math.random() * 0.6;
    const daysOffset = randomInt(-intervalDays / 2, intervalDays / 2);
    
    return {
      intervalDays,
      easeFactor,
      dueAt: addDays(now, daysOffset),
    };
  }
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export async function seedDecksAndFlashcards(prisma: PrismaClient) {
  console.log('📚 Создание колод и карточек...\n');

  // Get all users and tags
  const users = await prisma.user.findMany();
  const allTags = await prisma.tag.findMany();

  if (users.length === 0) {
    console.log('⚠️  Нет пользователей в базе. Сначала запустите seed-users');
    return { decks: [], flashcards: 0 };
  }

  if (allTags.length === 0) {
    console.log('⚠️  Нет тегов в базе. Сначала запустите seed-tags');
    return { decks: [], flashcards: 0 };
  }

  const createdDecks = [];
  let totalFlashcards = 0;

  // Assign decks to users
  for (let i = 0; i < DECK_DEFINITIONS.length; i++) {
    const deckDef = DECK_DEFINITIONS[i];
    const user = users[i % users.length];
    const isPublic = Math.random() > 0.3; // 70% public

    console.log(`📖 Создание колоды: ${deckDef.name}`);

    // Create deck
    const deck = await prisma.deck.create({
      data: {
        name: deckDef.name,
        description: deckDef.description,
        isPublic,
        userId: user.id,
      },
    });
    createdDecks.push(deck);

    // Add tags to deck
    const tagIdsToAdd: number[] = [];
    for (const tagName of deckDef.tagNames) {
      const tag = allTags.find(t => t.name === tagName);
      if (tag && !tagIdsToAdd.includes(tag.id)) {
        await prisma.deckTag.create({
          data: {
            deckId: deck.id,
            tagId: tag.id,
          },
        });
        tagIdsToAdd.push(tag.id);
      }
    }

    // Get flashcards for this deck
    const flashcardsData = deckDef.flashcardsGetter();
    
    // Create flashcards with valid SR parameters
    for (const cardData of flashcardsData) {
      // Determine card state distribution
      const stateRandom = Math.random();
      let repetitions = 0;
      let lapses = 0;

      if (stateRandom < 0.15) {
        // 15% - New cards
        repetitions = 0;
      } else if (stateRandom < 0.30) {
        // 15% - Learning cards
        repetitions = randomInt(1, 2);
      } else if (stateRandom < 0.60) {
        // 30% - Young cards
        repetitions = randomInt(3, 6);
      } else if (stateRandom < 0.85) {
        // 25% - Mature cards
        repetitions = randomInt(7, 15);
      } else {
        // 15% - Relearning cards (with lapses)
        repetitions = randomInt(1, 2);
        lapses = randomInt(1, 3);
      }

      const srParams = calculateValidSRParams(repetitions);
      const createdAt = randomDate(new Date(2024, 0, 1), new Date());

      await prisma.flashcard.create({
        data: {
          front: cardData.front,
          back: cardData.back,
          deckId: deck.id,
          repetitions,
          intervalDays: srParams.intervalDays,
          easeFactor: srParams.easeFactor,
          lapses,
          dueAt: srParams.dueAt,
          createdAt,
        },
      });
      totalFlashcards++;
    }

    console.log(`   ✅ Создано ${flashcardsData.length} карточек`);
  }

  console.log(`\n✅ Создано ${createdDecks.length} колод и ${totalFlashcards} карточек\n`);
  return { decks: createdDecks, flashcards: totalFlashcards };
}
