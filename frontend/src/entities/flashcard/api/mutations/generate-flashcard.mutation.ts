import type {
    GenerateFlashcardDto
} from "@/entities/flashcard/model/schemas/generate-flashcard.schema";
import {useMutation} from "@tanstack/vue-query";
import {generate} from "../endpoints/flashcards";

export function createGenerateFlashcardMutation(deckId: number) {
    return useMutation({
        mutationFn: (generateFlashcardMutation: GenerateFlashcardDto) => generate(deckId, generateFlashcardMutation),
    });
}