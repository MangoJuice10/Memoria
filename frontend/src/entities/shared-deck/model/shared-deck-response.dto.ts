import type { TagResponseDto } from "@/entities/tag";

export type SharedDeckResponseDto = {
    id: number;
    name: string;
    description: string;
    coverUrl: string | null;
    flashcardsCount: number;
    averageRating: number | null;
    tags: TagResponseDto[];
    ownerId: number;
    ownerUsername: string;
    ownerAvatarUrl: string | null;
    createdAt: string;
    updatedAt: string;
};
