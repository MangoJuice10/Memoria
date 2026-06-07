import { z } from "zod";

export const createTagSchema = z.strictObject({
  name: z.string().min(1),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

export type CreateTagDto = z.infer<typeof createTagSchema>;
