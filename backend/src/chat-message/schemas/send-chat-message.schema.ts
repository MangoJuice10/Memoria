import { z } from "zod";
import { createChatMessageSchema } from "./create-chat-message.schema";
import { frontSchema, backSchema } from "src/flashcard/schemas/flashcards.schema";

export const sendChatMessageSchema = createChatMessageSchema.extend({
  flashcardFront: frontSchema.nonempty(),
  flashcardBack: backSchema.nonempty(),
  deckId: z.number().int().positive(),
});

export type SendChatMessageDto = z.infer<typeof sendChatMessageSchema>;
