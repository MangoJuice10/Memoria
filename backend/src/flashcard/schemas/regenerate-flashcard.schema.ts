import { z } from "zod";
import { instructionSchema } from "src/flashcard/schemas/flashcard-generation.schema";

export const regenerateFlashcardSchema = z.strictObject({
  instruction: instructionSchema,
});

export type RegenerateFlashcardDto = z.infer<typeof regenerateFlashcardSchema>;
