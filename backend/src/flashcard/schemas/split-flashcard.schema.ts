import { z } from "zod";
import { createCountSchema } from "src/common/schemas/count.schema";
import { instructionSchema } from "src/flashcard/schemas/flashcard-generation.schema";
import {
  MAX_FLASHCARD_SPLIT_COUNT,
  MIN_FLASHCARD_SPLIT_COUNT,
} from "../constants/flashcard-generation.constants";

export const splitFlashcardSchema = z.strictObject({
  instruction: instructionSchema.optional(),
  count: createCountSchema(MIN_FLASHCARD_SPLIT_COUNT, MAX_FLASHCARD_SPLIT_COUNT).optional(),
});

export type SplitFlashcardDto = z.infer<typeof splitFlashcardSchema>;
