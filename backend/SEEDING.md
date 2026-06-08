# Database Seeding Guide

## Overview

Модульная система заполнения базы данных с академическими карточками по темам Computer Science и Software Engineering.

## Quick Start

### Полное заполнение (рекомендуется)

Очистить БД и заполнить все данные:

```bash
cd backend
npm run seed
```

### Очистка БД

Удалить все данные (кроме Users и Educational Resources):

```bash
npm run seed:clean
```

### Частичное заполнение

```bash
npm run seed:users          # Только пользователи
npm run seed:tags           # Только теги
npm run seed:decks          # Только колоды и карточки
npm run seed:reviews        # Только история повторений
npm run seed:feedbacks      # Только отзывы
```

## Темы карточек

### 📚 Из ваших книг:

1. **Паттерны Проектирования** - 24 карточки
   - Creational, Structural, Behavioral patterns
   - Singleton, Factory, Observer, Strategy, и др.

2. **Алгоритмы искусственного интеллекта на языке PROLOG** - 20 карточек
   - Факты, правила, унификация, backtracking
   - Рекурсия, списки, DCG

3. **Основы разработки веб-приложений на платформах Node.js и Deno** - 22 карточки
   - Event Loop, модули, async/await
   - Express, middleware, REST API

4. **Паттерны объектно-ориентированного проектирования** - 22 карточки
   - Инкапсуляция, наследование, полиморфизм
   - SOLID принципы

5. **Архитектура Корпоративных Программных Приложений** - 21 карточка
   - Слоистая архитектура, Domain Model
   - Repository, Unit of Work, Data Mapper

6. **Рефакторинг программного обеспечения** - 20 карточек
   - Code smells
   - Extract Method, Move Method, Replace Conditional

7. **Кроссплатформенное программирование** - 18 карточек
   - React Native, Flutter, Electron
   - PWA, WebAssembly

8. **Artificial Intelligence: A Modern Approach** - 20 карточек
   - Рациональные агенты, поиск
   - Машинное обучение, нейронные сети

### 🎓 Дополнительные темы:

9. **Алгоритмы и структуры данных** - 20 карточек
   - Массивы, списки, деревья, графы
   - Сортировки, поиск, сложность

10. **Базы данных и SQL** - 20 карточек
    - Реляционные БД, нормализация
    - SQL, транзакции, NoSQL

11. **Компьютерные сети** - 20 карточек
    - OSI, TCP/IP, HTTP/HTTPS
    - DNS, маршрутизация

**Итого:** 11 колод, ~230 карточек

## Что создаётся

### Пользователи (20 шт.)
- Русские имена: Александр, Дмитрий, Максим, и др.
- Email: `{username}@example.com`
- Пароль: `password123` (для всех)

### Теги (20 шт.)
- Паттерны проектирования
- Искусственный интеллект
- Web-разработка
- ООП
- Архитектура ПО
- Node.js, PROLOG, и др.

### Колоды (11 шт.)
- По темам из ваших книг
- ~70% публичные
- С правильными тегами
- Распределены между пользователями

### Карточки (~230 шт.)
- Академические, точные, без неточностей
- Следуют guidelines из system-prompts.constants.ts
- Все на русском языке

**Валидные SR параметры:**
- `repetitions = 0` → `intervalDays = 0`
- `repetitions = 1` → `intervalDays = 1`
- `repetitions = 2` → `intervalDays = 6`
- `repetitions > 2` → `intervalDays` по формуле SM2

Распределение состояний:
- 15% новые (New)
- 15% в обучении (Learning)
- 30% молодые (Young)
- 25% зрелые (Mature)
- 15% с ошибками (Relearning)

### История повторений
- 3-15 повторений на карточку
- Реалистичная прогрессия оценок
- Валидные `oldIntervalDays`

### Отзывы
- Только для публичных колод
- От 1 до 5 отзывов на колоду
- Реалистичные тексты на русском
- Больше высоких оценок (4-5 звёзд)

## Защита данных

При очистке **НЕ удаляются**:
- ✅ **Users** (пользователи)
- ✅ **Educational Resources** (образовательные ресурсы)

Удаляются:
- Decks, Flashcards, Tags
- Reviews, Feedbacks
- Chats, Chat Messages
- Все связи (junction tables)

## Тестовые учётные записи

После заполнения:

```
aleksandr@example.com / password123
dmitriy@example.com / password123
maksim@example.com / password123
sergey@example.com / password123
... (всего 20 пользователей)
```

## Исправленные проблемы

### ❌ Старый seeder:
- Немецкая колода содержала русский-английский
- intervalDays = 0 при repetitions > 0
- Неправильные SR параметры
- Тривиальный контент

### ✅ Новый seeder:
- Все карточки соответствуют темам
- Валидные SR параметры (проверено по SM2)
- Академический контент без ошибок
- Модульная структура

## Добавление новых тем

### 1. Создайте файл с карточками

`backend/prisma/seeders/my-topic-flashcards.ts`:

```typescript
export type FlashcardData = { front: string; back: string };

export const MY_TOPIC_FLASHCARDS: FlashcardData[] = [
  { front: 'Вопрос 1', back: 'Ответ 1' },
  { front: 'Вопрос 2', back: 'Ответ 2' },
  // ...
];
```

### 2. Добавьте в определения колод

`backend/prisma/seeders/deck-definitions.ts`:

```typescript
{
  name: 'Моя Тема',
  description: 'Описание темы',
  tagNames: ['Тег1', 'Тег2'],
  flashcardsGetter: () => require('./my-topic-flashcards').MY_TOPIC_FLASHCARDS,
}
```

### 3. Запустите seeder

```bash
npm run seed
```

## Структура файлов

```
backend/prisma/
├── seed.ts                              # Главный seeder
├── seed-all.ts                          # Полное заполнение
├── clean-db.ts                          # Очистка
├── seed-only-users.ts                   # Только users
├── seed-only-tags.ts                    # Только tags
├── seed-only-decks-flashcards.ts        # Только decks + flashcards
├── seed-only-reviews.ts                 # Только reviews
├── seed-only-feedbacks.ts               # Только feedbacks
└── seeders/
    ├── README.md                        # Документация
    ├── clean-database.ts                # Утилита очистки
    ├── seed-users.ts                    # Users seeder
    ├── seed-tags.ts                     # Tags seeder
    ├── seed-decks-flashcards.ts         # Decks + Flashcards seeder
    ├── seed-reviews.ts                  # Reviews seeder
    ├── seed-feedbacks.ts                # Feedbacks seeder
    ├── deck-definitions.ts              # Определения колод
    ├── design-patterns-flashcards.ts    # Карточки: Паттерны
    ├── prolog-ai-flashcards.ts          # Карточки: PROLOG
    ├── nodejs-deno-flashcards.ts        # Карточки: Node.js/Deno
    ├── oop-patterns-flashcards.ts       # Карточки: ООП
    ├── enterprise-architecture-flashcards.ts  # Карточки: Архитектура
    ├── refactoring-flashcards.ts        # Карточки: Рефакторинг
    ├── cross-platform-flashcards.ts     # Карточки: Кроссплатформа
    ├── ai-modern-approach-flashcards.ts # Карточки: AI
    ├── algorithms-data-structures-flashcards.ts  # Карточки: Алгоритмы
    ├── databases-flashcards.ts          # Карточки: БД
    └── networking-flashcards.ts         # Карточки: Сети
```

## Troubleshooting

### Ошибка: "No users found"
```bash
npm run seed:users
npm run seed:decks
```

### Ошибка: "No tags found"
```bash
npm run seed:tags
npm run seed:decks
```

### Хочу начать с чистого листа
```bash
npm run seed:clean
npm run seed
```

### Хочу удалить вообще всё
Редактировать `clean-db.ts` и установить:
```typescript
cleanUsers: true,
cleanEducationalResources: true,
```

## Проверка результата

После заполнения проверьте в UI:
1. Войдите как `aleksandr@example.com` / `password123`
2. Откройте страницу Decks - должно быть ~11 колод
3. Откройте любую колоду - должны быть карточки
4. Проверьте статистику - должны быть графики
5. Откройте Shared Decks - должны быть публичные колоды с отзывами

## Вопросы?

Смотрите `backend/prisma/seeders/README.md` для подробностей.
