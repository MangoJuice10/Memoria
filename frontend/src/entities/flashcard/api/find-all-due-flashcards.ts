import {client, type SuccessResponse} from "@/shared/api";
import type {FlashcardResponseDto} from "@/entities/flashcard";

export async function findAllDueFlashcards(deckId: number): Promise<FlashcardResponseDto[]> {
    const {data: {data}} = await client.get<SuccessResponse<FlashcardResponseDto[]>>(`/decks/${deckId}/review`);
    return data;
}