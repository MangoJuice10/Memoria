import { z } from "zod";
import {createCountSchema} from "src/common/schemas/count.schema";
import { instructionSchema } from "src/flashcard/schemas/flashcard-generation.schema";

export const generateFlashcardSchema = z.strictObject({
  instruction: instructionSchema,
  count: createCountSchema(1, 20),
});

export type GenerateFlashcardDto = z.infer<typeof generateFlashcardSchema>;
