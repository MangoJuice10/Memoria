import {z} from "zod";
import {
    type CreateChatMessageDto,
} from "./create-chat-message.schema";
import {createFrontSchema, createBackSchema} from "@/entities/flashcard";

export type FlashcardContext = {
    flashcardFront: z.infer<ReturnType<typeof createFrontSchema>>;
    flashcardBack: z.infer<ReturnType<typeof createBackSchema>>;
}

export type DeckContext = {
    deckId: number;
}

export type ChatContext = FlashcardContext & DeckContext;

export type SendChatMessageDto = CreateChatMessageDto & ChatContext;