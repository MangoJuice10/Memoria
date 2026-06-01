export type FlashcardResponseDto = {
    id: number;
    front: string;
    back: string;
    deckId: number;
    intervalDays: number;
    dueAt: string;
    createdAt: string;
    updatedAt: string;
}