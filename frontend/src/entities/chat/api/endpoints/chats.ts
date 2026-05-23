import type {CreateChatDto} from "src/entities/chat/model/create-chat.schema.ts";
import type {ChatResponseDto} from "src/entities/chat/model/chat-response.dto.ts";
import {client, type SuccessResponse} from "@/shared/api";

export async function create(createChatDto: CreateChatDto): Promise<ChatResponseDto> {
    const {data: {data}} = await client.post<SuccessResponse<ChatResponseDto>>("/chats", createChatDto);
    return data;
}

export async function findAll(): Promise<ChatResponseDto[]> {
    const {data: {data}} = await client.get<SuccessResponse<ChatResponseDto[]>>("/chats");
    return data;
}

export async function findOne(chatId: number): Promise<ChatResponseDto> {
    const {data: {data}} = await client.get<SuccessResponse<ChatResponseDto>>(`/chats/${chatId}`);
    return data;
}

export async function update(chatId: number): Promise<ChatResponseDto> {
    const {data: {data}} = await client.patch<SuccessResponse<ChatResponseDto>>(`/chats/${chatId}`);
    return data;
}

export async function remove(chatId: number) {
    await client.delete<SuccessResponse<ChatResponseDto>>(`/chats/${chatId}`);
}