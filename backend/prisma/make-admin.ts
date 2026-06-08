import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pgAdapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter: pgAdapter });

async function makeAdmin() {
  const email = process.argv[2];

  if (!email) {
    console.error('Usage: npm run make-admin <email>');
    console.error('Example: npm run make-admin aleksandr@example.com');
    process.exit(1);
  }

  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      console.error(`❌ User with email ${email} not found`);
      process.exit(1);
    }

    // Check if already admin
    const isAdmin = user.userRoles.some((ur) => ur.role.name === 'admin');

    if (isAdmin) {
      console.log(`✅ User ${user.username} (${email}) is already an admin`);
      process.exit(0);
    }

    // Find admin role
    const adminRole = await prisma.role.findUnique({
      where: { name: 'admin' },
    });

    if (!adminRole) {
      console.error('❌ Admin role not found. Please run seed-rbac.ts first');
      process.exit(1);
    }

    // Assign admin role
    await prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: adminRole.id,
      },
    });

    console.log(`✅ Successfully made ${user.username} (${email}) an admin!`);
    console.log(`\nUser now has roles:`);
    
    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    updatedUser?.userRoles.forEach((ur) => {
      console.log(`  - ${ur.role.name}`);
    });

  } catch (error) {
    console.error('Error making user admin:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

makeAdmin();
