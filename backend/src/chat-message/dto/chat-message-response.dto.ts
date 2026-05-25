import { ChatMessageRole } from "@prisma/client";

export type ChatMessageResponseDto = {
  id: number;
  role: ChatMessageRole;
  content: string;
  chatId: number;
  createdAt: Date;
  updatedAt: Date;
}