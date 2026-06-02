import type {FlashcardResponseDto} from "@/entities/flashcard/model/dto/flashcard-response.dto";

export type BatchFlashcardResponseDto = {
    created: FlashcardResponseDto[];
    updated: FlashcardResponseDto[];
    deleted: number[]
}