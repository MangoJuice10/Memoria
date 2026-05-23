import z from "zod";
import { createChatMessageSchema } from "./create-chat-message.schema";
import { createBackSchema, createFrontSchema } from "src/flashcard/schemas";

export const sendChatMessageSchema = createChatMessageSchema.extend({
  flashcardFront: createFrontSchema,
  flashcardBack: createBackSchema,
  deckId: z.number().int().positive(),
});

export type SendChatMessageDto = z.infer<typeof sendChatMessageSchema>;