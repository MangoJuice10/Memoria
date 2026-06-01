import { z } from "zod";
import { createFlashcardSchema } from "src/flashcard/schemas/create-flashcard.schema";

export const bulkCreateFlashcardsSchema = z.strictObject({
  flashcards: z.array(createFlashcardSchema).nonempty(),
});

export type BulkCreateFlashcardsDto = z.infer<typeof bulkCreateFlashcardsSchema>;
