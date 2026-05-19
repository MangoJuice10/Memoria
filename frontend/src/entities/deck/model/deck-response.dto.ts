export type DeckResponseDto = {
    id: number;
    name: string;
    description: string;
    isPublic: boolean;
    coverUrl: string | null;
    userId: number;
    flashcardsCount: number;
    createdAt: string;
    updatedAt: string;
}