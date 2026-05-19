export type DeckResponseDto = {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  coverUrl: string | null;
  flashcardsCount: number;
  createdAt: Date;
  updatedAt: Date;
};
