import {z} from "zod";
import {
    type CreateChatMessageDto,
} from "./create-chat-message.schema";
import {createCreateFrontSchema, createCreateBackSchema} from "@/entities/flashcard";

export type FlashcardContext = {
    flashcardFront: z.infer<ReturnType<typeof createCreateFrontSchema>>;
    flashcardBack: z.infer<ReturnType<typeof createCreateBackSchema>>;
}

export type DeckContext = {
    deckId: number;
}

export type ChatContext = FlashcardContext & DeckContext;

export type SendChatMessageDto = CreateChatMessageDto & ChatContext;