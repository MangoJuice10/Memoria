import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { seedRBAC } from './seed-rbac';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pgAdapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter: pgAdapter });

async function main() {
  console.log('🔐 Заполнение RBAC данными\n');
  console.log('=' .repeat(60));
  console.log('\n');

  await seedRBAC(prisma);

  console.log('=' .repeat(60));
  console.log('✨ Заполнение RBAC завершено!\n');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при заполнении RBAC:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
