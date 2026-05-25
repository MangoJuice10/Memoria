import { PrismaClient } from "@prisma/client";
import * as argon from "argon2";
import users from "./users.json";
import { PrismaPg } from "@prisma/adapter-pg";

const pgAdapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter: pgAdapter });

const usersData = users;

async function main() {
  await prisma.flashcard.deleteMany();
  await prisma.deck.deleteMany();

  for (const user of usersData) {
    const passwordHash = await argon.hash(user.password);

    await prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        passwordHash,
        decks: {
          create: user.decks.map((deck) => ({
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

  console.log("Main seeder executed successfully");
}

main()
  .catch((error) => {
    console.log(`Seeding failed: ${error}`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
