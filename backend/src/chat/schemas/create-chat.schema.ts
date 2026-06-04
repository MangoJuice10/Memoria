import { z } from "zod";
import { chatTitleSchema } from "./chats.schema";

export const createChatSchema = z.strictObject({
  title: chatTitleSchema.optional(),
});

export type CreateChatDto = z.infer<typeof createChatSchema>;
