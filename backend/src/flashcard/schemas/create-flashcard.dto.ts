import {z} from "zod";

export const createFlashcardSchema = z.object({
  front: z.string().nonempty(),
  back: z.string().nonempty(),
})

export type CreateFlashcardDto = z.infer<typeof createFlashcardSchema>;