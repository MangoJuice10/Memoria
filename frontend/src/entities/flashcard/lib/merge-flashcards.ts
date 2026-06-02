import {type MaybeRefOrGetter, toValue} from "vue";
import type {FlashcardResponseDto} from "@/entities/flashcard/model/dto/flashcard-response.dto";
import type {DraftCreatedFlashcard, DraftFlashcard} from "../model/types/draft-flashcard.type";
import type {DisplayFlashcard} from "../model/types/display-flashcard.type";

function getFlashcardOrder(flashcard: FlashcardResponseDto | DraftFlashcard) {
    if ("status" in flashcard) {
        switch (flashcard.status) {
            case "CREATED":
                return 0;
            case "UPDATED":
                return 1;
            case "DELETED":
                return 2;
        }
    }
    return 3;
}

export function mergeFlashcards(persistedFlashcards: MaybeRefOrGetter<FlashcardResponseDto[]>, draftFlashcards: MaybeRefOrGetter<DraftFlashcard[]>): DisplayFlashcard[] {
    const createdDraftFlashcards = toValue(draftFlashcards).filter(({status}) => status === "CREATED") as DraftCreatedFlashcard[];

    const overrides = toValue(persistedFlashcards).map((persistedFlashcard): DisplayFlashcard => {
        const draftFlashcard = toValue(draftFlashcards).find((draftFlashcard) => draftFlashcard.id === persistedFlashcard.id);
        return {
            status: "COMMITTED",
            ...persistedFlashcard,
            ...draftFlashcard
        };
    });

    return [
        ...overrides,
        ...createdDraftFlashcards
    ].sort((flashcardA, flashcardB) => getFlashcardOrder(flashcardA) - getFlashcardOrder(flashcardB));
}