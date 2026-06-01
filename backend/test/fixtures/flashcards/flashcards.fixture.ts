import { type CreateFlashcardDto } from "src/flashcard/schemas";
import { BatchFlashcardInput } from "src/flashcard/schemas/batch-flashcard.schema";

export function createFlashcardsFixtures(
  flashcard: {
    front: string;
    back: string;
  },
  flashcards: {
    front: string;
    back: string;
  }[],
) {
  const createCreateFlashcardDto = (
    overrides?: Partial<CreateFlashcardDto>,
  ): CreateFlashcardDto => {
    return {
      ...flashcard,
      ...overrides,
    };
  };

  const createBatchFlashcardDto = (
    overrides?: Partial<BatchFlashcardInput>,
  ): BatchFlashcardInput => {
    return {
      create: [
        ...flashcards,
      ],
      ...overrides,
    };
  };

  return {
    createCreateFlashcardDto,
    createBatchFlashcardDto
  };
}
