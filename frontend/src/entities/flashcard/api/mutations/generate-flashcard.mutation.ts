import type {
    GenerateFlashcardDto
} from "@/entities/flashcard/model/schemas/generate-flashcard.schema";
import {useMutation} from "@tanstack/vue-query";
import {generate} from "../endpoints/flashcards";

export function createGenerateFlashcardMutation() {
    return useMutation({
        mutationFn: ({deckId, generateFlashcardDto}: {
            deckId: number;
            generateFlashcardDto: GenerateFlashcardDto;
        }) => generate(deckId, generateFlashcardDto),
    });
}