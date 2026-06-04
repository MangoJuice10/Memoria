import type {
    RegenerateFlashcardDto
} from "@/entities/flashcard/model/schemas/regenerate-flashcard.schema";
import {regenerate} from "../endpoints/flashcards";
import {useMutation} from "@tanstack/vue-query";

export function createRegenerateFlashcardMutation() {
    return useMutation({
        mutationFn: ({deckId, flashcardId, regenerateFlashcardDto}: {
            deckId: number;
            flashcardId: number;
            regenerateFlashcardDto: RegenerateFlashcardDto
        }) => regenerate(deckId, flashcardId, regenerateFlashcardDto)
    });
}