# Database Seeders

Модульная система заполнения базы данных для Memoria.

## Структура

```
seeders/
├── README.md (этот файл)
├── clean-database.ts          # Утилита очистки БД
├── seed-users.ts              # Seeder пользователей
├── seed-tags.ts               # Seeder тегов
├── seed-decks-flashcards.ts   # Seeder колод и карточек
├── seed-reviews.ts            # Seeder истории повторений
├── seed-feedbacks.ts          # Seeder отзывов
├── deck-definitions.ts        # Определения колод и связи с карточками
└── *-flashcards.ts            # Файлы с карточками по темам
```

## Темы карточек

Созданы академические карточки по следующим темам:

1. **Паттерны Проектирования** (design-patterns-flashcards.ts)
2. **Алгоритмы ИИ на PROLOG** (prolog-ai-flashcards.ts)
3. **Node.js и Deno** (nodejs-deno-flashcards.ts)
4. **ООП Паттерны** (oop-patterns-flashcards.ts)
5. **Архитектура Корпоративных Приложений** (enterprise-architecture-flashcards.ts)
6. **Рефакторинг** (refactoring-flashcards.ts)
7. **Кроссплатформенное программирование** (cross-platform-flashcards.ts)
8. **AI: Modern Approach** (ai-modern-approach-flashcards.ts)
9. **Алгоритмы и Структуры Данных** (algorithms-data-structures-flashcards.ts)
10. **Базы Данных** (databases-flashcards.ts)
11. **Компьютерные Сети** (networking-flashcards.ts)

## Использование

### Полное заполнение

Очищает БД (кроме Users и Educational Resources) и заполняет все таблицы:

```bash
npm run seed
# или
npm run seed:all
```

### Частичное заполнение

Заполнить только определённые таблицы:

```bash
# Только пользователи
npm run seed:users

# Только теги
npm run seed:tags

# Только колоды и карточки
npm run seed:decks

# Только историю повторений
npm run seed:reviews

# Только отзывы
npm run seed:feedbacks
```

### Очистка

Очистить БД, сохраняя Users и Educational Resources:

```bash
npm run seed:clean
```

## Правила заполнения

### Пользователи (Users)
- Создаётся 20 пользователей с русскими именами
- Email: `{username}@example.com`
- Password: `password123` (для всех)
- Не удаляются при очистке по умолчанию

### Теги (Tags)
- 20 тегов по темам: ООП, ИИ, Web, Архитектура, и т.д.
- Связываются с колодами по смыслу

### Колоды (Decks)
- Создаётся 11 колод (по темам из книг)
- Распределяются между пользователями
- ~70% публичных колод (isPublic: true)
- Каждая колода имеет 1-3 тега

### Карточки (Flashcards)
- Количество зависит от темы (обычно 20-24 карточки на колоду)
- **ВАЛИДНЫЕ SR параметры:**
  - repetitions = 0 → intervalDays = 0
  - repetitions = 1 → intervalDays = 1
  - repetitions = 2 → intervalDays = 6
  - repetitions > 2 → intervalDays вычисляется по формуле SM2
- Распределение состояний:
  - 15% новые (repetitions = 0)
  - 15% в обучении (repetitions = 1-2)
  - 30% молодые (repetitions = 3-6)
  - 25% зрелые (repetitions = 7-15)
  - 15% с ошибками (lapses > 0)

### История повторений (Reviews)
- Создаётся только для карточек с repetitions > 0 или lapses > 0
- От 3 до 15 повторений на карточку
- Реалистичная прогрессия оценок:
  - Ранние повторения: больше AGAIN/BAD
  - Средние повторения: больше GOOD
  - Поздние повторения: больше PERFECT
- Валидные oldIntervalDays на основе индекса повторения

### Отзывы (Feedbacks)
- Создаются только для публичных колод
- ~70% колод получают отзывы
- От 1 до 5 отзывов на колоду
- Один пользователь = один отзыв на колоду
- Распределение оценок: больше 4-5 звёзд, меньше 2-3

## Важные особенности

### Сохранение данных
При очистке НЕ удаляются:
- ✅ Пользователи (Users)
- ✅ Образовательные ресурсы (Educational Resources)

Удаляются:
- ❌ Колоды (Decks)
- ❌ Карточки (Flashcards)
- ❌ Теги (Tags)
- ❌ Отзывы (Feedbacks)
- ❌ История повторений (Reviews)
- ❌ Чаты (Chats)
- ❌ Сообщения (Chat Messages)

### Связи
- Колоды → Пользователи (userId)
- Колоды → Теги (через DeckTag)
- Карточки → Колоды (deckId)
- Отзывы → Колоды + Пользователи (deckId, userId)
- История → Карточки (flashcardId)

### Валидация SR параметров
Система гарантирует, что:
- intervalDays = 0 только при repetitions = 0
- intervalDays > 0 при repetitions > 0
- easeFactor в диапазоне 2.0-2.8
- dueAt корректно рассчитан на основе intervalDays

## Добавление новых тем

1. Создайте файл `{topic}-flashcards.ts`:
```typescript
export type FlashcardData = { front: string; back: string };

export const TOPIC_FLASHCARDS: FlashcardData[] = [
  { front: 'Вопрос', back: 'Ответ' },
  // ...
];
```

2. Добавьте определение в `deck-definitions.ts`:
```typescript
{
  name: 'Название колоды',
  description: 'Описание',
  tagNames: ['Тег1', 'Тег2'],
  flashcardsGetter: () => require('./topic-flashcards').TOPIC_FLASHCARDS,
}
```

3. Запустите seed.

## Тестовые данные

После заполнения доступны тестовые учётные записи:

- **aleksandr@example.com** / password123
- **dmitriy@example.com** / password123
- **maksim@example.com** / password123
- **sergey@example.com** / password123

Всего 20 пользователей, все с паролем `password123`.
