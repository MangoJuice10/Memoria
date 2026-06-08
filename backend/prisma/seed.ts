import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { cleanDatabase } from './seeders/clean-database';
import { seedUsers } from './seeders/seed-users';
import { seedTags } from './seeders/seed-tags';
import { seedDecksAndFlashcards } from './seeders/seed-decks-flashcards';
import { seedReviews } from './seeders/seed-reviews';
import { seedFeedbacks } from './seeders/seed-feedbacks';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pgAdapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter: pgAdapter });

async function main() {
  console.log('🌱 Полное заполнение базы данных\n');
  console.log('=' .repeat(60));
  console.log('\n');

  // Check current state
  const currentUsers = await prisma.user.count();
  const currentDecks = await prisma.deck.count();
  const currentFlashcards = await prisma.flashcard.count();
  const currentReviews = await prisma.review.count();
  const currentFeedbacks = await prisma.feedback.count();
  const currentTags = await prisma.tag.count();

  console.log('📊 Текущее состояние базы данных:');
  console.log(`   👥 Пользователей: ${currentUsers}`);
  console.log(`   🏷️  Тегов: ${currentTags}`);
  console.log(`   📚 Колод: ${currentDecks}`);
  console.log(`   🃏 Карточек: ${currentFlashcards}`);
  console.log(`   📊 Повторений: ${currentReviews}`);
  console.log(`   ⭐ Отзывов: ${currentFeedbacks}`);
  console.log('\n');

  // Clean database (preserving Users and Educational Resources)
  await cleanDatabase(prisma, {
    cleanUsers: false,
    cleanEducationalResources: false,
  });

  // Seed in order
  const users = await seedUsers(prisma);
  const tags = await seedTags(prisma);
  const { decks, flashcards } = await seedDecksAndFlashcards(prisma);
  const reviews = await seedReviews(prisma);
  const feedbacks = await seedFeedbacks(prisma);

  // Final stats
  const finalUsers = await prisma.user.count();
  const finalDecks = await prisma.deck.count();
  const finalFlashcards = await prisma.flashcard.count();
  const finalReviews = await prisma.review.count();
  const finalFeedbacks = await prisma.feedback.count();
  const finalTags = await prisma.tag.count();

  console.log('=' .repeat(60));
  console.log('📊 Итоговое состояние базы данных:');
  console.log(`   👥 Всего пользователей: ${finalUsers}`);
  console.log(`   🏷️  Всего тегов: ${finalTags}`);
  console.log(`   📚 Всего колод: ${finalDecks}`);
  console.log(`   🃏 Всего карточек: ${finalFlashcards}`);
  console.log(`   📊 Всего повторений: ${finalReviews}`);
  console.log(`   ⭐ Всего отзывов: ${finalFeedbacks}`);
  console.log('\n');

  console.log('🔐 Тестовые учетные данные:');
  console.log('   Email: aleksandr@example.com');
  console.log('   Password: password123');
  console.log('\n   Другие пользователи:');
  console.log('   - dmitriy@example.com');
  console.log('   - maksim@example.com');
  console.log('   - sergey@example.com');
  console.log('   (все с паролем: password123)');
  console.log('\n');

  console.log('✨ Полное заполнение завершено!\n');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при заполнении базы данных:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
