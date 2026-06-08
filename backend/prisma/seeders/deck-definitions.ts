import { FlashcardData } from './design-patterns-flashcards';

export type DeckDefinition = {
  name: string;
  description: string;
  tagNames: string[];
  flashcardsGetter: () => FlashcardData[];
};

export const DECK_DEFINITIONS: DeckDefinition[] = [
  {
    name: 'Паттерны Проектирования',
    description: 'Классические паттерны проектирования из книги Gang of Four: порождающие, структурные и поведенческие паттерны',
    tagNames: ['Паттерны проектирования', 'ООП', 'Архитектура ПО'],
    flashcardsGetter: () => require('./design-patterns-flashcards').DESIGN_PATTERNS_FLASHCARDS,
  },
  {
    name: 'Алгоритмы искусственного интеллекта на языке PROLOG',
    description: 'Основы языка PROLOG и его применение для решения задач искусственного интеллекта',
    tagNames: ['PROLOG', 'Искусственный интеллект', 'Алгоритмы'],
    flashcardsGetter: () => require('./prolog-ai-flashcards').PROLOG_AI_FLASHCARDS,
  },
  {
    name: 'Основы разработки веб-приложений на платформах Node.js и Deno',
    description: 'Node.js, Deno, асинхронное программирование, REST API, веб-фреймворки',
    tagNames: ['Node.js', 'Web-разработка', 'REST API'],
    flashcardsGetter: () => require('./nodejs-deno-flashcards').NODEJS_DENO_FLASHCARDS,
  },
  {
    name: 'Паттерны объектно-ориентированного проектирования',
    description: 'Принципы ООП, SOLID, инкапсуляция, наследование, полиморфизм, проектирование классов',
    tagNames: ['ООП', 'Паттерны проектирования', 'Архитектура ПО'],
    flashcardsGetter: () => require('./oop-patterns-flashcards').OOP_PATTERNS_FLASHCARDS,
  },
  {
    name: 'Архитектура Корпоративных Программных Приложений',
    description: 'Паттерны корпоративной архитектуры: слоистая архитектура, Domain Model, Data Mapper, Repository',
    tagNames: ['Архитектура ПО', 'Паттерны проектирования', 'Базы данных'],
    flashcardsGetter: () => require('./enterprise-architecture-flashcards').ENTERPRISE_ARCHITECTURE_FLASHCARDS,
  },
  {
    name: 'Рефакторинг программного обеспечения',
    description: 'Техники рефакторинга, запахи кода, улучшение структуры существующего кода',
    tagNames: ['Рефакторинг', 'ООП', 'Паттерны проектирования'],
    flashcardsGetter: () => require('./refactoring-flashcards').REFACTORING_FLASHCARDS,
  },
  {
    name: 'Кроссплатформенное программирование',
    description: 'React Native, Flutter, Electron, PWA - создание приложений для множества платформ',
    tagNames: ['Кроссплатформенность', 'Web-разработка', 'Node.js'],
    flashcardsGetter: () => require('./cross-platform-flashcards').CROSS_PLATFORM_FLASHCARDS,
  },
  {
    name: 'Artificial Intelligence: A Modern Approach',
    description: 'Фундаментальные концепции ИИ: агенты, поиск, машинное обучение, нейронные сети, NLP',
    tagNames: ['Искусственный интеллект', 'Алгоритмы', 'Математика'],
    flashcardsGetter: () => require('./ai-modern-approach-flashcards').AI_MODERN_APPROACH_FLASHCARDS,
  },
  {
    name: 'Алгоритмы и структуры данных',
    description: 'Массивы, списки, деревья, графы, сортировки, поиск, сложность алгоритмов',
    tagNames: ['Алгоритмы', 'Структуры данных', 'Математика'],
    flashcardsGetter: () => require('./algorithms-data-structures-flashcards').ALGORITHMS_DATA_STRUCTURES_FLASHCARDS,
  },
  {
    name: 'Базы данных и SQL',
    description: 'Реляционные БД, SQL, нормализация, индексы, транзакции, NoSQL',
    tagNames: ['Базы данных', 'Архитектура ПО'],
    flashcardsGetter: () => require('./databases-flashcards').DATABASES_FLASHCARDS,
  },
  {
    name: 'Компьютерные сети',
    description: 'Модель OSI, TCP/IP, HTTP/HTTPS, DNS, маршрутизация, протоколы',
    tagNames: ['Сети', 'Web-разработка'],
    flashcardsGetter: () => require('./networking-flashcards').NETWORKING_FLASHCARDS,
  },
];
