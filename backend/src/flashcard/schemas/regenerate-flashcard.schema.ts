import { z } from "zod";

export const regenerateFlashcardSchema = z.strictObject({
  instruction: z.string().min(10).max(10000),
});

export type RegenerateFlashcardDto = z.infer<typeof regenerateFlashcardSchema>;