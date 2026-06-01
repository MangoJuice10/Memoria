import {queryClient} from "@/shared/api";
import {useMutation} from "@tanstack/vue-query";
import {batch} from "../endpoints/flashcards";
import {type BatchFlashcardDto, flashcardsQueryKeys} from "@/entities/flashcard";

export function createBatchFlashcardMutation() {
    return useMutation({
        mutationFn: ({deckId, batchFlashcardDto}: {
            deckId: number,
            batchFlashcardDto: BatchFlashcardDto
        }) => batch(deckId, batchFlashcardDto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: flashcardsQueryKeys.all
            });
        }
    });
}