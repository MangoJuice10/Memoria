import { z } from "zod";
import { backSchema, frontSchema } from "src/flashcard/schemas/flashcards.schema";

export const largeLanguageModelGeneratedFlashcardSchema = z.strictObject({
  front: frontSchema,
  back: backSchema,
});
