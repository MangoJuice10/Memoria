import type { FlashcardResponseDto } from "@/entities/flashcard";
import type { FeedbackResponseDto } from "@/entities/feedback";
import type { SharedDeckResponseDto } from "./shared-deck-response.dto";

export type SharedDeckDetailResponseDto = SharedDeckResponseDto & {
    flashcards: FlashcardResponseDto[];
    feedback: FeedbackResponseDto[];
};
