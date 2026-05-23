import {z} from "zod";

export const createChatSchema = z.strictObject({
  title: z.string().trim().min(1).max(100).optional(),
});

export type CreateChatDto = z.input<typeof createChatSchema>;