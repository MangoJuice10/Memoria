import type {FlashcardResponseDto} from "@/entities/flashcard";
import {client, type SuccessResponse} from "@/shared/api";
import type {ReviewDto} from "../../model/review.dto";

export async function review(deckId: number, flashcardId: number, reviewRatingDto: ReviewDto): Promise<FlashcardResponseDto> {
    const {data: {data}} = await client.post<SuccessResponse<FlashcardResponseDto>>(`/decks/${deckId}/review/${flashcardId}`, reviewRatingDto);
    return data;
}