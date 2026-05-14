export type DeckResponseDto = {
    id: number;
    name: string;
    description: string;
    isPublic: boolean;
    userId: number;
    flashcardsCount: number;
    createdAt: string;
    updatedAt: string;
}