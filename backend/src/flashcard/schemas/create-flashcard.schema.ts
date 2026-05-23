import { z } from "zod";

export const createFrontSchema = z.string().nonempty();
export const createBackSchema = z.string().nonempty();

export const createFlashcardSchema = z.strictObject({
  front: createFrontSchema,
  back: createBackSchema,
});

export type CreateFlashcardDto = z.infer<typeof createFlashcardSchema>;
