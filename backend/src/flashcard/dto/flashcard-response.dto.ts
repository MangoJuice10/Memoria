export type FlashcardResponseDto = {
  id: number;
  front: string;
  back: string;
  deckId: number;
  intervalDays: number;
  dueAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
