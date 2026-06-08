import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

export async function seedUsers(prisma: PrismaClient) {
  console.log('👥 Создание пользователей...');

  const russianNames = [
    'Александр', 'Дмитрий', 'Максим', 'Сергей', 'Андрей',
    'Алексей', 'Артём', 'Илья', 'Кирилл', 'Михаил',
    'Анна', 'Мария', 'Елена', 'Ольга', 'Ирина',
    'Наталья', 'Татьяна', 'Юлия', 'Светлана', 'Екатерина'
  ];

  const transliteratedUsernames = [
    'aleksandr', 'dmitriy', 'maksim', 'sergey', 'andrey',
    'aleksey', 'artem', 'ilya', 'kirill', 'mikhail',
    'anna', 'mariya', 'elena', 'olga', 'irina',
    'natalya', 'tatyana', 'yuliya', 'svetlana', 'ekaterina'
  ];

  const password = await argon2.hash('password123');
  const users = [];

  for (let i = 0; i < 20; i++) {
    const name = russianNames[i % russianNames.length];
    const username = transliteratedUsernames[i % transliteratedUsernames.length] + (i >= russianNames.length ? i : '');
    const email = `${username}@example.com`;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      users.push(existingUser);
      console.log(`   ⏭️  Пользователь ${name} (${email}) уже существует`);
    } else {
      const user = await prisma.user.create({
        data: {
          username,
          email,
          passwordHash: password,
        },
      });
      users.push(user);
      console.log(`   ✅ Создан пользователь ${name} (${email})`);
    }
  }

  console.log(`✅ Итого пользователей: ${users.length}\n`);
  return users;
}
