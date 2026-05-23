export type ChatMessageRole = "USER" | "ASSISTANT";

export type RagCitation = {
    id: string;
    score: number;
    educationalResourceId: number;
    educationalResourceName: string;
    educationalResourceOriginalFilename: string;
    chunkIdx: number;
}

export type ChatMessageResponseDto = {
    id: number;
    role: ChatMessageRole;
    content: string;
    citations: RagCitation[] | null;
    chatId: number;
    createdAt: Date;
    updatedAt: Date;
}