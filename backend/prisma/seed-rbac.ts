import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

export async function seedRBAC(prisma: PrismaClient) {
  console.log('Seeding RBAC data...');

  // Create Roles
  const userRole = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
      description: 'Standard user with basic permissions',
    },
  });

  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      description: 'Administrator with full system access',
    },
  });

  console.log('✓ Roles created:', { userRole, adminRole });

  // Create Permissions for USER role
  const userPermissions = [
    // Deck permissions
    { resource: 'deck', action: 'create', scope: 'own', description: 'Create own decks' },
    { resource: 'deck', action: 'read', scope: 'own', description: 'Read own decks' },
    { resource: 'deck', action: 'read', scope: 'any', description: 'Read public decks' },
    { resource: 'deck', action: 'update', scope: 'own', description: 'Update own decks' },
    { resource: 'deck', action: 'delete', scope: 'own', description: 'Delete own decks' },
    
    // Flashcard permissions
    { resource: 'flashcard', action: 'create', scope: 'own', description: 'Create flashcards in own decks' },
    { resource: 'flashcard', action: 'read', scope: 'own', description: 'Read flashcards in own decks' },
    { resource: 'flashcard', action: 'update', scope: 'own', description: 'Update flashcards in own decks' },
    { resource: 'flashcard', action: 'delete', scope: 'own', description: 'Delete flashcards in own decks' },
    
    // Educational Resource permissions
    { resource: 'educational_resource', action: 'create', scope: 'own', description: 'Upload own resources' },
    { resource: 'educational_resource', action: 'read', scope: 'own', description: 'Read own resources' },
    { resource: 'educational_resource', action: 'update', scope: 'own', description: 'Update own resources' },
    { resource: 'educational_resource', action: 'delete', scope: 'own', description: 'Delete own resources' },
    
    // Tag permissions
    { resource: 'tag', action: 'read', scope: 'any', description: 'Read all tags' },
    
    // Feedback permissions
    { resource: 'feedback', action: 'create', scope: 'own', description: 'Create feedback' },
    { resource: 'feedback', action: 'read', scope: 'own', description: 'Read own feedback' },
    { resource: 'feedback', action: 'update', scope: 'own', description: 'Update own feedback' },
    { resource: 'feedback', action: 'delete', scope: 'own', description: 'Delete own feedback' },
  ];

  // Create Permissions for ADMIN role
  const adminPermissions = [
    // User management
    { resource: 'user', action: 'create', scope: 'any', description: 'Create users' },
    { resource: 'user', action: 'read', scope: 'any', description: 'Read all users' },
    { resource: 'user', action: 'update', scope: 'any', description: 'Update any user' },
    { resource: 'user', action: 'delete', scope: 'any', description: 'Delete any user' },
    
    // Deck management
    { resource: 'deck', action: 'create', scope: 'any', description: 'Create any deck' },
    { resource: 'deck', action: 'read', scope: 'any', description: 'Read all decks' },
    { resource: 'deck', action: 'update', scope: 'any', description: 'Update any deck' },
    { resource: 'deck', action: 'delete', scope: 'any', description: 'Delete any deck' },
    
    // Flashcard management
    { resource: 'flashcard', action: 'create', scope: 'any', description: 'Create any flashcard' },
    { resource: 'flashcard', action: 'read', scope: 'any', description: 'Read all flashcards' },
    { resource: 'flashcard', action: 'update', scope: 'any', description: 'Update any flashcard' },
    { resource: 'flashcard', action: 'delete', scope: 'any', description: 'Delete any flashcard' },
    
    // Educational Resource management
    { resource: 'educational_resource', action: 'create', scope: 'any', description: 'Create any resource' },
    { resource: 'educational_resource', action: 'read', scope: 'any', description: 'Read all resources' },
    { resource: 'educational_resource', action: 'update', scope: 'any', description: 'Update any resource' },
    { resource: 'educational_resource', action: 'delete', scope: 'any', description: 'Delete any resource' },
    
    // Tag management
    { resource: 'tag', action: 'create', scope: 'any', description: 'Create tags' },
    { resource: 'tag', action: 'read', scope: 'any', description: 'Read all tags' },
    { resource: 'tag', action: 'update', scope: 'any', description: 'Update tags' },
    { resource: 'tag', action: 'delete', scope: 'any', description: 'Delete tags' },
    
    // Feedback management
    { resource: 'feedback', action: 'read', scope: 'any', description: 'Read all feedback' },
    { resource: 'feedback', action: 'delete', scope: 'any', description: 'Delete any feedback' },
  ];

  // Insert all permissions
  const allPermissions = [...userPermissions, ...adminPermissions];
  
  for (const permission of allPermissions) {
    await prisma.permission.upsert({
      where: {
        resource_action_scope: {
          resource: permission.resource,
          action: permission.action,
          scope: permission.scope,
        },
      },
      update: {},
      create: permission,
    });
  }

  console.log(`✓ Created ${allPermissions.length} permissions`);

  // Assign permissions to USER role
  const userPermissionRecords = await prisma.permission.findMany({
    where: {
      OR: userPermissions.map(p => ({
        resource: p.resource,
        action: p.action,
        scope: p.scope,
      })),
    },
  });

  for (const permission of userPermissionRecords) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: userRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: userRole.id,
        permissionId: permission.id,
      },
    });
  }

  console.log(`✓ Assigned ${userPermissionRecords.length} permissions to USER role`);

  // Assign permissions to ADMIN role
  const adminPermissionRecords = await prisma.permission.findMany({
    where: {
      OR: adminPermissions.map(p => ({
        resource: p.resource,
        action: p.action,
        scope: p.scope,
      })),
    },
  });

  for (const permission of adminPermissionRecords) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    });
  }

  console.log(`✓ Assigned ${adminPermissionRecords.length} permissions to ADMIN role`);

  // Assign default USER role to all existing users
  const existingUsers = await prisma.user.findMany();
  
  for (const user of existingUsers) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: user.id,
          roleId: userRole.id,
        },
      },
      update: {},
      create: {
        userId: user.id,
        roleId: userRole.id,
      },
    });
  }

  console.log(`✓ Assigned USER role to ${existingUsers.length} existing users`);

  // Assign ADMIN role to aleksandr@example.com
  const adminUser = await prisma.user.findUnique({
    where: { email: 'aleksandr@example.com' },
  });

  if (adminUser) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: adminUser.id,
          roleId: adminRole.id,
        },
      },
      update: {},
      create: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    });
    console.log(`✓ Assigned ADMIN role to aleksandr@example.com`);
  }

  console.log('✅ RBAC seeding completed successfully!\n');
}

// Allow running standalone
if (require.main === module) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const pgAdapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });

  const prisma = new PrismaClient({ adapter: pgAdapter });

  seedRBAC(prisma)
    .catch((e) => {
      console.error('Error seeding RBAC:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
