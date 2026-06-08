import { PrismaClient } from '@prisma/client';

export async function seedTags(prisma: PrismaClient) {
  console.log('🏷️  Создание тегов...');

  const tags = [
    { name: 'Паттерны проектирования', color: '#FF6B6B' },
    { name: 'Искусственный интеллект', color: '#4ECDC4' },
    { name: 'Web-разработка', color: '#45B7D1' },
    { name: 'ООП', color: '#FFA07A' },
    { name: 'Архитектура ПО', color: '#98D8C8' },
    { name: 'Node.js', color: '#68D391' },
    { name: 'PROLOG', color: '#F7DC6F' },
    { name: 'Рефакторинг', color: '#BB8FCE' },
    { name: 'Кроссплатформенность', color: '#85C1E2' },
    { name: 'Алгоритмы', color: '#F19CBB' },
    { name: 'Базы данных', color: '#A8DADC' },
    { name: 'Сети', color: '#E9C46A' },
    { name: 'Математика', color: '#F4A261' },
    { name: 'Структуры данных', color: '#2A9D8F' },
    { name: 'Тестирование', color: '#E76F51' },
    { name: 'DevOps', color: '#457B9D' },
    { name: 'Безопасность', color: '#D62828' },
    { name: 'Микросервисы', color: '#F77F00' },
    { name: 'REST API', color: '#06AED5' },
    { name: 'GraphQL', color: '#E01E84' },
  ];

  const createdTags = [];
  for (const tag of tags) {
    const created = await prisma.tag.create({ data: tag });
    createdTags.push(created);
    console.log(`   ✅ Создан тег: ${tag.name}`);
  }

  console.log(`✅ Создано ${createdTags.length} тегов\n`);
  return createdTags;
}
