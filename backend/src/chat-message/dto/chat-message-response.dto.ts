import { ChatMessageRole } from "@prisma/client";
import { RagCitation } from "src/rag/types";

export type ChatMessageResponseDto = {
  id: number;
  role: ChatMessageRole;
  content: string;
  citations: RagCitation[] | null;
  chatId: number;
  createdAt: Date;
  updatedAt: Date;
}