import { z } from "zod";

export const generateFlashcardSchema = z.strictObject({
  instruction: z.string().min(10).max(10000),
  count: z.number().int().min(1).max(20),
});

export type GenerateFlashcardDto = z.infer<typeof generateFlashcardSchema>;
