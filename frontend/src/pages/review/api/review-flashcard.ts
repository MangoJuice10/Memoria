import type {FlashcardResponseDto} from "@/entities/flashcard";
import {client, type SuccessResponse} from "@/shared/api";
import type {ReviewRatingDto} from "../model/review-rating.dto";

export async function reviewFlashcard(deckId: number, flashcardId: number, reviewRatingDto: ReviewRatingDto): Promise<FlashcardResponseDto> {
    const {data: {data}} = await client.post<SuccessResponse<FlashcardResponseDto>>(`/decks/${deckId}/review/${flashcardId}`, reviewRatingDto);
    return data;
}