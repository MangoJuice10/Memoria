import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api";
import {update} from "../endpoints/decks";
import {decksQueryKeys} from "@/entities/deck/api/query-keys/decks-query-keys";
import type {UpdateDeckDto} from "../../model/update-deck.schema";
import type {DeckResponseDto} from "../../model/deck-response.dto";

export function createUpdateDeckMutation() {
    return useMutation({
        mutationFn: ({deckId, updateDeckDto}: {
            deckId: number;
            updateDeckDto: UpdateDeckDto;
        }) => update(deckId, updateDeckDto),
        onSuccess: async (updatedDeck, variables) => {
            await queryClient.setQueryData(
                decksQueryKeys.all,
                (old: DeckResponseDto[] | undefined) => {
                    if (!old) return old;
                    return old.map((deck) => deck.id === updatedDeck.id ? updatedDeck : deck);
                }
            );
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