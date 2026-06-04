import {
    type CreateChatMessageDto,
} from "./create-chat-message.schema";

export type FlashcardContext = {
    flashcardId: number;
}

export type ChatContext = FlashcardContext;

export type SendChatMessageDto = CreateChatMessageDto & ChatContext;