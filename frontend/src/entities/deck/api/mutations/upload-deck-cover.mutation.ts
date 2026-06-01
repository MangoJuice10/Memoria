import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api";
import {uploadCover} from "../endpoints/upload-cover";
import {decksQueryKeys} from "@/entities/deck/api/query-keys/decks-query-keys";
import type {DeckResponseDto} from "../../model/deck-response.dto";

export function createUploadDeckCoverMutation() {
    return useMutation({
        mutationFn: ({deckId, file}: {
            deckId: number;
            file: File;
        }) => uploadCover(deckId, file),
        onSuccess: async (updatedDeck, variables) => {
            await queryClient.setQueryData(
                decksQueryKeys.byId(variables.deckId),
                (old: DeckResponseDto | undefined) => {
                    if (!old) return old;
                    return updatedDeck;
                }
            );
        }
    });
}