import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api";
import {update} from "../endpoints/flashcards";
import {flashcardsQueryKeys} from "../../api/query-keys/flashcards-query-keys";
import type {UpdateFlashcardDto} from "../../model/schemas/update-flashcard.schema";
import type {FlashcardResponseDto} from "@/entities/flashcard/model/dto/flashcard-response.dto";

export function createUpdateFlashcardMutation(deckId: number, flashcardId: number) {
    return useMutation({
        mutationFn: (updateFlashcardDto: UpdateFlashcardDto) => update(deckId, flashcardId, updateFlashcardDto),
        onSuccess: async (updatedFlashcard) => {
            await queryClient.setQueryData(
                flashcardsQueryKeys.byDeck(deckId),
                (old: FlashcardResponseDto[] | undefined) => {
                    if (!old) return old;
                    return old.map(flashcard => flashcard.id === updatedFlashcard.id ? updatedFlashcard : flashcard);
                }
            );
        }
    });
}