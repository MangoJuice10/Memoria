export type ChatMessageRole = "USER" | "ASSISTANT";

export type ChatMessageResponseDto = {
    id: number;
    role: ChatMessageRole;
    content: string;
    chatId: number;
    createdAt: string;
    updatedAt: string;
}