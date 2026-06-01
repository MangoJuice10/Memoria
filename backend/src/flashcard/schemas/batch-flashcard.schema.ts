import { z } from "zod";
import { createFlashcardSchema } from "src/flashcard/schemas/create-flashcard.schema";
import { updateFlashcardSchema } from "src/flashcard/schemas/update-flashcard.schema";

export const batchFlashcardSchema = z.strictObject({
  create: z.array(createFlashcardSchema).optional().default([]),
  update: z
    .array(
      updateFlashcardSchema.extend({
        id: z.number().int().positive(),
      }),
    )
    .optional()
    .default([]),
  delete: z.array(z.number().int().positive()).optional().default([]),
});

export type BatchFlashcardInput = z.input<typeof batchFlashcardSchema>;
export type BatchFlashcardDto = z.output<typeof batchFlashcardSchema>;