export type Permission = {
  resource: string;
  action: string;
  scope: string;
};

export type Role = 'user' | 'admin';

export type UserPermissions = {
  permissions: Permission[];
  roles: Role[];
  isAdmin: boolean;
};

export type AdminUser = {
  id: number;
  username: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
  roles: Array<{
    id: number;
    name: string;
  }>;
  _count: {
    decks: number;
    educationalResources: number;
  };
};

export type AdminDeck = {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  coverUrl: string | null;
  createdAt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
  _count: {
    flashcards: number;
  };
};

export type AdminFlashcard = {
  id: number;
  front: string;
  back: string;
  deckId: number;
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  lapses: number;
  dueAt: string;
  createdAt: string;
  updatedAt: string;
  deck?: {
    id: number;
    name: string;
  };
};

export type AdminStatistics = {
  totalUsers: number;
  totalDecks: number;
  totalFlashcards: number;
  totalReviews: number;
  totalFeedback: number;
  recentUsers: Array<{ username: string; email: string; createdAt: string }>;
  recentDecks: Array<{ name: string; username: string; createdAt: string }>;
};

export type AdminTag = {
  id: number;
  name: string;
  color: string;
  _count: {
    decks: number;
  };
};

export type AdminEducationalResource = {
  id: number;
  name: string;
  description: string;
  originalFilename: string;
  fileKey: string;
  fileUrl: string | null;
  coverKey: string | null;
  coverUrl: string | null;
  createdAt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
  _count: {
    decks: number;
  };
};

export type AdminFeedback = {
  id: number;
  rating: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
  deck: {
    id: number;
    name: string;
    user: {
      id: number;
      username: string;
    };
  };
};
