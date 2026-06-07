/* ===== AI GENERATED CODE START ===== */
import type { TagResponseDto } from "@/entities/tag";
/* ===== AI GENERATED CODE END ===== */

export type DeckResponseDto = {
    id: number;
    name: string;
    description: string;
    isPublic: boolean;
    coverUrl: string | null;
    userId: number;
    flashcardsCount: number;
    /* ===== AI GENERATED CODE START ===== */
    tags: TagResponseDto[];
    /* ===== AI GENERATED CODE END ===== */
    createdAt: string;
    updatedAt: string;
}