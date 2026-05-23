import {client, type SuccessResponse} from "@/shared/api";
import type {SendChatMessageDto} from "../../model/send-chat-message.dto.ts";
import type {ChatMessageResponseDto} from "../../model/chat-message-response.dto.ts";

export async function send(chatId: number, sendChatMessageDto: SendChatMessageDto): Promise<ChatMessageResponseDto> {
    const {data: {data}} = await client.post<SuccessResponse<ChatMessageResponseDto>>(`chats/${chatId}/messages`, sendChatMessageDto);
    return data;
}

export async function findAll(chatId: number): Promise<ChatMessageResponseDto[]> {
    const {data: {data}} = await client.get<SuccessResponse<ChatMessageResponseDto[]>>(`chats/${chatId}/messages`);
    return data;
}