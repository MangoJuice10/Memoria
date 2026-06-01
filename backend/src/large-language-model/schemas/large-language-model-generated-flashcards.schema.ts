import { z } from "zod";
import { backSchema, frontSchema } from "src/flashcard/schemas/flashcard.schemas";

export const largeLanguageModelGeneratedFlashcardsSchema = z.array(
  z.strictObject({
    front: frontSchema,
    back: backSchema,
  }),
);
