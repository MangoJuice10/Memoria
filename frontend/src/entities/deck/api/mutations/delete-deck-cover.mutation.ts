import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api";
import {removeCover} from "../endpoints/remove-cover";
import {decksQueryKeys} from "../query-keys/decks-query-keys";
import {type DeckResponseDto} from "../../model/deck-response.dto";

export function createDeleteDeckCoverMutation() {
    return useMutation({
        mutationFn: (deckId: number) => removeCover(deckId),
        onSuccess: async (updatedDeck, variables) => {
            await queryClient.setQueryData(
                decksQueryKeys.byId(variables),
                (old: DeckResponseDto | undefined) => {
                    if (!old) return old;
                    return updatedDeck;
                }
            );
        }
    });
}