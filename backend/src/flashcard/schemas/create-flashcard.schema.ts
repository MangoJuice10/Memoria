import { z } from "zod";
import { frontSchema, backSchema } from "src/flashcard/schemas/flashcards.schema";

export const createFlashcardSchema = z.strictObject({
  front: frontSchema,
  back: backSchema,
});

export type CreateFlashcardDto = z.infer<typeof createFlashcardSchema>;
