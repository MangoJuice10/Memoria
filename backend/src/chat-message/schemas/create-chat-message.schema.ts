import { z } from "zod";

export const createChatMessageSchema = z.strictObject({
  content: z.string().trim().min(1).max(4000),
});

export type CreateChatMessageDto = z.infer<typeof createChatMessageSchema>;