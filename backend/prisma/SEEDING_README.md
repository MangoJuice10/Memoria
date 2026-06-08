# Database Seeding Guide

## Overview

This seeding script populates the database with realistic Russian language data to test the Memoria application, especially the Statistics feature.

## What Gets Created

### Users (10)
- **Usernames**: Александр, Дмитрий, Максим, Сергей, Андрей, etc.
- **Password**: `password123` (for all users)
- **Emails**: `{username}@example.com`

### Decks (~15-20)
Russian language decks covering various topics:
- 📚 Английский язык для начинающих
- 📜 История России
- 🔢 Математика: Алгебра
- 🧬 Биология: Анатомия человека
- ⚛️ Физика: Механика
- 🧪 Химия: Органическая химия
- 🌍 География мира
- 💻 Программирование: JavaScript
- 📖 Литература: Русская классика
- And more...

### Flashcards (300-600)
Each deck contains 15-30 flashcards with:
- Russian content (questions and answers)
- Varied states:
  - **20% NEW** - Never reviewed
  - **20% LEARNING** - 1-2 repetitions
  - **30% YOUNG** - 3-5 repetitions, intervals < 21 days
  - **20% MATURE** - 6+ repetitions, intervals 21-120 days
  - **10% RELEARNING** - Failed after graduation (lapses > 0)

### Reviews (1000-3000)
Realistic review history with:
- Progression over time (worse performance early, better later)
- Timestamps spread across past months
- Rating distribution:
  - Early: 30% AGAIN, 30% BAD, 35% GOOD, 5% PERFECT
  - Middle: 10% AGAIN, 15% BAD, 50% GOOD, 25% PERFECT
  - Late: 5% AGAIN, 10% BAD, 45% GOOD, 40% PERFECT
- Proper `startedAt` and `endedAt` timestamps
- `oldIntervalDays` and `oldEaseFactor` tracking

### Chats (~14-35)
AI chat conversations with:
- Topics related to learning
- Multiple message exchanges
- USER and ASSISTANT messages

### Feedback (~15-50)
Ratings and reviews for public decks:
- 1-5 star ratings
- Russian language comments
- From various users

### Tags (8)
Categorization tags:
- Языки (Languages)
- Наука (Science)
- История (History)
- Математика (Mathematics)
- Программирование (Programming)
- Медицина (Medicine)
- География (Geography)
- Литература (Literature)

## How to Run

### Option 1: Using Prisma CLI (Recommended)
```bash
cd backend
npx prisma db seed
```

### Option 2: Using npm script
```bash
cd backend
npm run db:dev:seed
```

### Option 3: Direct execution
```bash
cd backend
npx ts-node prisma/seed.ts
```

## Important Notes

### ⚠️ Warning
This script **DELETES ALL EXISTING DATA** before seeding. Make sure you're running this on a development database, not production!

### What Gets Deleted
The script clears data in this order:
1. Reviews
2. Chat Messages
3. Chats
4. Feedback
5. Deck Tags
6. Tags
7. Flashcards
8. Deck Educational Resources
9. Educational Resources
10. Decks
11. Users

### What Does NOT Get Seeded
- **Educational Resources** - Requires actual file uploads, so these are intentionally omitted

## Testing the Statistics Feature

After seeding, you can test the Statistics feature with:

1. **Login** with any user:
   - Email: `александр@example.com`
   - Password: `password123`

2. **Navigate** to any deck

3. **Click** on the "Statistics" tab

4. **View** rich statistical data:
   - Today's review summary
   - Card distribution by phase (NEW, LEARNING, YOUNG, MATURE, RELEARNING)
   - Review calendar heatmap
   - Future due forecast
   - Retention rates by maturity
   - Answer button distribution
   - And more!

## Expected Statistics

With the seeded data, you should see:

- **Review History**: Hundreds to thousands of review records
- **Card Distribution**:
  - ~20% NEW cards (never reviewed)
  - ~20% LEARNING (being learned)
  - ~30% YOUNG (recently graduated)
  - ~20% MATURE (well-established)
  - ~10% RELEARNING (needs reinforcement)
- **Retention Trends**: Improving over time (early failures, later success)
- **Activity Patterns**: Reviews spread across past months
- **Hourly Distribution**: Reviews at various times of day

## Customization

You can modify the seeding script to adjust:

### Number of Users
```typescript
for (let i = 0; i < 10; i++) { // Change 10 to desired number
  // ...
}
```

### Decks per User
```typescript
const numDecks = randomInt(2, 4); // Adjust range
```

### Cards per Deck
```typescript
const numCards = randomInt(15, 30); // Adjust range
```

### Reviews per Card
```typescript
const reviewsToCreate = Math.min(totalReviewCount, randomInt(5, 20)); // Adjust range
```

### Card State Distribution
Modify the probabilities in the flashcard creation loop:
```typescript
if (state < 0.2) { // NEW (20%)
} else if (state < 0.4) { // LEARNING (20%)
} else if (state < 0.7) { // YOUNG (30%)
} else if (state < 0.9) { // MATURE (20%)
} else { // RELEARNING (10%)
}
```

## Troubleshooting

### Error: "Cannot find module 'argon2'"
```bash
npm install argon2
```

### Error: "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### Error: Database connection issues
Make sure your database is running and `.env` file is configured:
```bash
npm run db:dev:up
```

### Script runs but no data appears
Check if migrations are applied:
```bash
npx prisma migrate deploy
```

## Sample Output

```
🌱 Начинаем заполнение базы данных...
🗑️  Очистка существующих данных...
👥 Создание пользователей...
✅ Создано 10 пользователей
🏷️  Создание тегов...
✅ Создано 8 тегов
📚 Создание колод и карточек...
✅ Создано 18 колод и 432 карточки
📊 Создание истории повторений...
✅ Создано 2156 записей повторений
💬 Создание чатов...
✅ Создано 23 чатов с 276 сообщениями
⭐ Создание отзывов...
✅ Создано 34 отзывов

✨ Заполнение базы данных завершено!
📊 Итоговая статистика:
   👥 Пользователей: 10
   📚 Колод: 18
   🃏 Карточек: 432
   📊 Повторений: 2156
   💬 Чатов: 23
   📝 Сообщений: 276
   ⭐ Отзывов: 34
   🏷️  Тегов: 8

🔐 Тестовые учетные данные:
   Email: александр@example.com
   Password: password123
```

## Database Schema

The seed script follows the Prisma schema exactly:
- All required fields are populated
- All relationships (foreign keys) are properly established
- Timestamps (`createdAt`, `updatedAt`) are realistic
- Enum values (`ReviewRating`, `ChatMessageRole`) are correctly used
- Cascading deletes are respected

## Performance

Seeding typically takes:
- **Small dataset** (10 users, 15 decks): ~10-30 seconds
- **Medium dataset** (current config): ~30-60 seconds
- **Large dataset** (modified for more data): ~1-3 minutes

The bottleneck is usually the Review creation, as it's the most numerous entity.

## Next Steps

After seeding:

1. **Start the backend**:
   ```bash
   npm run start:dev
   ```

2. **Start the frontend**:
   ```bash
   cd ../frontend
   npm run dev
   ```

3. **Login** and explore the fully populated application!

4. **Test Statistics** - Navigate to any deck's Statistics tab to see rich visualizations

5. **Review Cards** - Practice with seeded flashcards

6. **Explore Chats** - View AI conversations

7. **Check Feedback** - See ratings on public decks

Happy testing! 🎉
