import { z } from "zod";
import { frontSchema, backSchema } from "./flashcard.schemas";

export const updateFlashcardSchema = z.strictObject({
  front: frontSchema.optional(),
  back: backSchema.optional(),
});

export type UpdateFlashcardDto = z.infer<typeof updateFlashcardSchema>;
