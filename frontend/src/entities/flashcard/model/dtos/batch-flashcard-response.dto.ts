import type {FlashcardResponseDto} from "../dtos/flashcard-response.dto";

export type BatchFlashcardResponseDto = {
    created: FlashcardResponseDto[];
    updated: FlashcardResponseDto[];
    deleted: number[]
}