import {useMutation} from "@tanstack/vue-query";
import {split} from "../endpoints/flashcards";
import type {SplitFlashcardDto} from "../../model/schemas/split-flashcard.schema";

export function createSplitFlashcardMutation() {
    return useMutation({
        mutationFn: ({deckId, flashcardId, splitFlashcardDto}: {
            deckId: number;
            flashcardId: number;
            splitFlashcardDto: SplitFlashcardDto;
        }) => split(deckId, flashcardId, splitFlashcardDto),
    });
}