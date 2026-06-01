import { z } from "zod";

export const generateFlashcardSchema = z.strictObject({
  instruction: z.string().nonempty(),
  count: z.number().int().positive(),
});

export type GenerateFlashcardDto = z.infer<typeof generateFlashcardSchema>;
