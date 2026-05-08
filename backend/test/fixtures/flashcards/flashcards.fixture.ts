import { type CreateFlashcardDto } from "src/flashcard/schemas";

export function createFlashcardsFixtures(front: string, back: string) {
  const createCreateFlashcardDto = (
    overrides?: Partial<CreateFlashcardDto>,
  ): CreateFlashcardDto => {
    return {
      front,
      back,
      ...overrides,
    };
  };

  return {
    createCreateFlashcardDto,
  };
}
