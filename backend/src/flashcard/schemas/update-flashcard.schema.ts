import { z } from "zod";

export const updateFlashcardSchema = z.strictObject({
  front: z.string().nonempty().optional(),
  back: z.string().nonempty().optional(),
});

export type UpdateFlashcardDto = z.infer<typeof updateFlashcardSchema>;
