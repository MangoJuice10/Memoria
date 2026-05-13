export type DeckResponseDto = {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  flashcardsCount: number;
  createdAt: Date;
  updatedAt: Date;
};
