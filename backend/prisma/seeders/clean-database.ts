import { PrismaClient } from '@prisma/client';

export async function cleanDatabase(prisma: PrismaClient, options: {
  cleanUsers?: boolean;
  cleanEducationalResources?: boolean;
} = {}) {
  console.log('🧹 Очистка базы данных...\n');

  const {
    cleanUsers = false,
    cleanEducationalResources = false,
  } = options;

  try {
    // Delete in correct order to respect foreign key constraints

    // 1. Delete reviews (depends on flashcards)
    const deletedReviews = await prisma.review.deleteMany({});
    console.log(`   🗑️  Удалено ${deletedReviews.count} повторений`);

    // 2. Delete flashcards (depends on decks)
    const deletedFlashcards = await prisma.flashcard.deleteMany({});
    console.log(`   🗑️  Удалено ${deletedFlashcards.count} карточек`);

    // 3. Delete feedbacks (depends on decks and users)
    const deletedFeedbacks = await prisma.feedback.deleteMany({});
    console.log(`   🗑️  Удалено ${deletedFeedbacks.count} отзывов`);

    // 4. Delete deck_educational_resources (junction table)
    const deletedDeckResources = await prisma.deckEducationalResource.deleteMany({});
    console.log(`   🗑️  Удалено ${deletedDeckResources.count} связей колод с ресурсами`);

    // 5. Delete deck_tags (junction table)
    const deletedDeckTags = await prisma.deckTag.deleteMany({});
    console.log(`   🗑️  Удалено ${deletedDeckTags.count} связей колод с тегами`);

    // 6. Delete decks
    const deletedDecks = await prisma.deck.deleteMany({});
    console.log(`   🗑️  Удалено ${deletedDecks.count} колод`);

    // 7. Delete tags
    const deletedTags = await prisma.tag.deleteMany({});
    console.log(`   🗑️  Удалено ${deletedTags.count} тегов`);

    // 8. Delete chat messages (depends on chats)
    const deletedChatMessages = await prisma.chatMessage.deleteMany({});
    console.log(`   🗑️  Удалено ${deletedChatMessages.count} сообщений в чатах`);

    // 9. Delete chats
    const deletedChats = await prisma.chat.deleteMany({});
    console.log(`   🗑️  Удалено ${deletedChats.count} чатов`);

    // 10. Optionally delete educational resources
    if (cleanEducationalResources) {
      const deletedResources = await prisma.educationalResource.deleteMany({});
      console.log(`   🗑️  Удалено ${deletedResources.count} образовательных ресурсов`);
    } else {
      console.log(`   ⏭️  Образовательные ресурсы сохранены`);
    }

    // 11. Optionally delete users
    if (cleanUsers) {
      const deletedUsers = await prisma.user.deleteMany({});
      console.log(`   🗑️  Удалено ${deletedUsers.count} пользователей`);
    } else {
      console.log(`   ⏭️  Пользователи сохранены`);
    }

    console.log('\n✅ Очистка завершена\n');
  } catch (error) {
    console.error('❌ Ошибка при очистке базы данных:', error);
    throw error;
  }
}
