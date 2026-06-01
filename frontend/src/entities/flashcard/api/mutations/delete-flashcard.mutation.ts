import {queryClient} from "@/shared/api";
import {useMutation} from "@tanstack/vue-query";
import {remove} from "../endpoints/flashcards";
import {flashcardsQueryKeys} from "../query-keys/flashcards-query-keys";
import type {FlashcardResponseDto} from "../../model/dtos/flashcard-response.dto";

export function createDeleteFlashcardMutation() {
    return useMutation({
        mutationFn: ({deckId, flashcardId}: {
            deckId: number;
            flashcardId: number
        }) => remove(deckId, flashcardId),
        onSuccess: async (_, variables) => {
            await queryClient.setQueryData(
                flashcardsQueryKeys.byDeck(variables.deckId),
                (old: FlashcardResponseDto[] | undefined) => {
                    if (!old) return old;
                    return old.filter(flashcard => flashcard.id !== variables.flashcardId);
                }
            );
        },
    });
}