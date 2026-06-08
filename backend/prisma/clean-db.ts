import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { cleanDatabase } from './seeders/clean-database';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pgAdapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter: pgAdapter });

async function main() {
  console.log('🧹 Очистка базы данных (сохраняя Users и Educational Resources)\n');
  
  await cleanDatabase(prisma, {
    cleanUsers: false,
    cleanEducationalResources: false,
  });
  
  console.log('✨ Готово!\n');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
