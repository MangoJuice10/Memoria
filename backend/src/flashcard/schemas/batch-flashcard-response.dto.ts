import { FlashcardResponseDto } from "src/flashcard/dto";

export type BatchFlashcardResponseDto = {
  created: FlashcardResponseDto[];
  updated: FlashcardResponseDto[];
  deleted: number[];
};
