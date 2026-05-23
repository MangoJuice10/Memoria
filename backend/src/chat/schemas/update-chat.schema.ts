import { z } from "zod";

export const updateChatSchema = z.strictObject({
  title: z.string().trim().min(1).max(100).optional(),
});

export type UpdateChatDto = z.input<typeof updateChatSchema>;
