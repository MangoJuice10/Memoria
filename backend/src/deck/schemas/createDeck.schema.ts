import { z } from "zod";

export const createDeckSchema = z.strictObject({
  name: z.string(),
  description: z.string(),
  isPublic: z.boolean(),
});

export type CreateDeckDto = z.infer<typeof createDeckSchema>;