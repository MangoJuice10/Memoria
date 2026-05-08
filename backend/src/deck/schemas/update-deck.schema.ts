import { z } from "zod";

export const updateDeckSchema = z.strictObject({
  name: z.string().optional(),
  description: z.string().optional(),
  isPublic: z.boolean().optional(),
});

export type UpdateDeckDto = z.infer<typeof updateDeckSchema>;
