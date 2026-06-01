import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api";
import {create} from "../endpoints/decks";
import {decksQueryKeys} from "../query-keys/decks-query-keys";
import {type CreateDeckDto} from "../../model/create-deck.schema";
import {type DeckResponseDto} from "../../model/deck-response.dto";

export function createCreateDeckMutation() {
    return useMutation({
        mutationFn: (createDeckDto: CreateDeckDto) => create(createDeckDto),
        onSuccess: async (createdDeck) => {
            await queryClient.setQueryData(
                decksQueryKeys.all,
                (old: DeckResponseDto[] | undefined) => {
                    if (!old) return old;
                    return [...old, createdDeck];
                }
            );
        }
    });
}