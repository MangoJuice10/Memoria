import { PrismaClient } from "@prisma/client";
import ownDecks from "./own-decks.json";
import { PrismaPg } from "@prisma/adapter-pg";

const pgAdapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter: pgAdapter });

async function seedOwnDecks(userId: number) {
  await prisma.flashcard.deleteMany({
    where: {
      deck: {
        userId,
      },
    },
  });

  await prisma.deck.deleteMany({
    where: {
      userId,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error(`User with id ${userId} not found`);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      decks: {
        create: ownDecks.map((deck) => ({
          name: deck.name,
          description: deck.description,
          isPublic: deck.isPublic,
          flashcards: {
            create: deck.flashcards,
          },
        })),
      },
    },
  });
}

const userIdArg = process.argv[2];
if (!userIdArg) {
  console.error("Usage: ts-node own-decks.seeder.ts <userId>");
  process.exit(1);
}

seedOwnDecks(parseInt(userIdArg))
  .then(() => {
    console.log("Own decks seeder executed successfully");
  })
  .catch((error) => {
    console.log(`Seeding failed: ${error}`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
