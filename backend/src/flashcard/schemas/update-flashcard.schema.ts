import { z } from "zod";
import { frontSchema, backSchema } from "src/flashcard/schemas/flashcards.schema";

export const updateFlashcardSchema = z.strictObject({
  front: frontSchema.optional(),
  back: backSchema.optional(),
});

export type UpdateFlashcardDto = z.infer<typeof updateFlashcardSchema>;
