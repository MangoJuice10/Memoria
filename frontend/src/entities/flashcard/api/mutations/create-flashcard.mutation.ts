import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api";
import {create} from "../endpoints/flashcards";
import {flashcardsQueryKeys} from "../query-keys/flashcards-query-keys";
import type {CreateFlashcardDto} from "../../model/schemas/create-flashcard.schema";
import type {FlashcardResponseDto} from "@/entities/flashcard/model/dto/flashcard-response.dto";

export function createCreateFlashcardMutation(deckId: number) {
    return useMutation({
        mutationFn: (createFlashcardDto: CreateFlashcardDto) => create(deckId, createFlashcardDto),
        onSuccess: async (createdFlashcard) => {
            await queryClient.setQueryData(
                flashcardsQueryKeys.byDeck(deckId),
                (old: FlashcardResponseDto[] | undefined) => {
                    if (!old) return old;
                    return [...old, createdFlashcard];
                }
            );
        }
    });
}