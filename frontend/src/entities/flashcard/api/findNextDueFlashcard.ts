import type {FlashcardResponseDto} from "@/entities/flashcard";
import {client, type SuccessResponse} from "@/shared/api";

export async function findNextDueFlashcard(deckId: number): Promise<FlashcardResponseDto> {
    const {data: {data}} = await client.get<SuccessResponse<FlashcardResponseDto>>(`/decks/${deckId}/review/next`);
    return data;
}