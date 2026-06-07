import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

interface FlashcardSeed {
  front: string;
  back: string;
}

interface TagSeed {
  name: string;
  color: string;
}

interface FeedbackSeed {
  userEmail: string;
  rating: number;
  content: string;
}

interface SharedDeckSeed {
  name: string;
  description: string;
  ownerEmail: string;
  flashcards: FlashcardSeed[];
  tags: TagSeed[];
  feedback: FeedbackSeed[];
}

const sharedDecksData: SharedDeckSeed[] = [
  {
    name: "Spanish Vocabulary — Beginners",
    description:
      "A curated set of the most common Spanish words and phrases for absolute beginners.",
    ownerEmail: "user@example.com",
    flashcards: [
      { front: "Hola", back: "Hello" },
      { front: "Gracias", back: "Thank you" },
      { front: "Por favor", back: "Please" },
      { front: "Buenos días", back: "Good morning" },
      { front: "¿Cómo estás?", back: "How are you?" },
    ],
    tags: [
      { name: "Languages", color: "#4A90D9" },
      { name: "Beginners", color: "#7ED321" },
    ],
    feedback: [
      {
        userEmail: "user@example.com",
        rating: 5,
        content: "Excellent starter deck — covers all the essentials.",
      },
    ],
  },
  {
    name: "JavaScript ES2024 Essentials",
    description:
      "Key JavaScript concepts and new ES2024 features every frontend developer should know.",
    ownerEmail: "user@example.com",
    flashcards: [
      {
        front: "What does the nullish coalescing operator (??) do?",
        back: "Returns the right-hand operand when the left-hand operand is null or undefined; otherwise returns the left-hand operand.",
      },
      {
        front: "What is optional chaining (?.) used for?",
        back: "Safely accesses deeply nested object properties without throwing if an intermediate value is null or undefined.",
      },
      {
        front: "What is a Promise?",
        back: "An object representing the eventual completion or failure of an asynchronous operation, allowing chaining with .then() and .catch().",
      },
      {
        front: "What is the difference between == and ===?",
        back: "== compares values after type coercion; === compares both value and type without coercion (strict equality).",
      },
      {
        front: "What does Array.prototype.flatMap() do?",
        back: "Maps each element using a callback, then flattens the result one level deep. Equivalent to .map(...).flat(1).",
      },
    ],
    tags: [
      { name: "Programming", color: "#F5A623" },
      { name: "JavaScript", color: "#F8E71C" },
      { name: "Frontend", color: "#9B59B6" },
    ],
    feedback: [
      {
        userEmail: "user@example.com",
        rating: 4,
        content:
          "Great coverage of modern JS features. Would love a few more examples.",
      },
    ],
  },
  {
    name: "World Capitals Quiz",
    description:
      "Test your knowledge of world capitals. Covers all continents with 20+ countries.",
    ownerEmail: "user@example.com",
    flashcards: [
      { front: "What is the capital of France?", back: "Paris" },
      { front: "What is the capital of Japan?", back: "Tokyo" },
      { front: "What is the capital of Brazil?", back: "Brasília" },
      { front: "What is the capital of Australia?", back: "Canberra" },
      {
        front: "What is the capital of South Africa?",
        back: "Pretoria (executive), Cape Town (legislative), Bloemfontein (judicial)",
      },
      { front: "What is the capital of Canada?", back: "Ottawa" },
    ],
    tags: [
      { name: "Geography", color: "#2ECC71" },
      { name: "Quiz", color: "#E74C3C" },
    ],
    feedback: [
      {
        userEmail: "user@example.com",
        rating: 3,
        content:
          "Good selection, but some less-known capitals would make it more challenging.",
      },
      {
        userEmail: "user@example.com",
        rating: 5,
        content: "Perfect for a quick geography refresher before a trip!",
      },
    ],
  },
];

async function getOrCreateTag(
  prisma: PrismaClient,
  name: string,
  color: string,
): Promise<number> {
  const existing = await prisma.tag.findFirst({ where: { name } });
  if (existing) return existing.id;
  const created = await prisma.tag.create({ data: { name, color } });
  return created.id;
}

export async function seedSharedDecks(
  prismaClient?: PrismaClient,
): Promise<void> {
  const prisma =
    prismaClient ??
    new PrismaClient({
      adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL,
      }),
    });

  const shouldDisconnect = !prismaClient;

  try {
    for (const deckData of sharedDecksData) {
      const owner = await prisma.user.findUnique({
        where: { email: deckData.ownerEmail },
      });

      if (!owner) {
        console.warn(
          `User with email ${deckData.ownerEmail} not found. Skipping deck "${deckData.name}".`,
        );
        continue;
      }

      // Find or create the deck by name + owner (idempotency check)
      let deck = await prisma.deck.findFirst({
        where: { name: deckData.name, userId: owner.id },
      });

      if (!deck) {
        deck = await prisma.deck.create({
          data: {
            name: deckData.name,
            description: deckData.description,
            isPublic: true,
            userId: owner.id,
          },
        });
      } else {
        // Ensure existing deck is marked public
        deck = await prisma.deck.update({
          where: { id: deck.id },
          data: { isPublic: true },
        });
      }

      // Idempotent flashcards — check by front content within the deck
      for (const card of deckData.flashcards) {
        const existingCard = await prisma.flashcard.findFirst({
          where: { deckId: deck.id, front: card.front },
        });
        if (!existingCard) {
          await prisma.flashcard.create({
            data: { front: card.front, back: card.back, deckId: deck.id },
          });
        }
      }

      // Idempotent tags — get or create by name, then attach to deck if not already linked
      for (const tagData of deckData.tags) {
        const tagId = await getOrCreateTag(prisma, tagData.name, tagData.color);

        const existingLink = await prisma.deckTag.findUnique({
          where: { deckId_tagId: { deckId: deck.id, tagId } },
        });
        if (!existingLink) {
          await prisma.deckTag.create({
            data: { deckId: deck.id, tagId },
          });
        }
      }

      // Idempotent feedback — check by (deckId, userId, content) to avoid exact duplicates
      for (const feedbackData of deckData.feedback) {
        const feedbackUser = await prisma.user.findUnique({
          where: { email: feedbackData.userEmail },
        });

        if (!feedbackUser) {
          console.warn(
            `User with email ${feedbackData.userEmail} not found. Skipping feedback for deck "${deckData.name}".`,
          );
          continue;
        }

        const existingFeedback = await prisma.feedback.findFirst({
          where: {
            deckId: deck.id,
            userId: feedbackUser.id,
            content: feedbackData.content,
          },
        });

        if (!existingFeedback) {
          await prisma.feedback.create({
            data: {
              content: feedbackData.content,
              rating: feedbackData.rating,
              deckId: deck.id,
              userId: feedbackUser.id,
            },
          });
        }
      }
    }

    console.log("Shared decks seeder executed successfully");
  } finally {
    if (shouldDisconnect) {
      await prisma.$disconnect();
    }
  }
}

// Allow running this file directly: dotenv -e .env -- ts-node src/prisma/seeders/shared-decks.seeder.ts
if (require.main === module) {
  // Load .env when running standalone (outside the dotenv-cli wrapper)
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("dotenv").config();
  seedSharedDecks().catch((error) => {
    console.error(`Seeding failed: ${error}`);
    process.exit(1);
  });
}
