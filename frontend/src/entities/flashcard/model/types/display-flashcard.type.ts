import type {DraftCreatedFlashcard, FlashcardResponseDto} from "@/entities/flashcard";

export type DisplayFlashcard =
    | DraftCreatedFlashcard
    | FlashcardResponseDto & { status: "COMMITTED" | "UPDATED" | "DELETED" };