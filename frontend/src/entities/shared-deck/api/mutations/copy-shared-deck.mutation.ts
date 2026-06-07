import { useMutation } from "@tanstack/vue-query";
import { queryClient } from "@/shared/api";
import { useToastStore } from "@/shared/model";
import { copySharedDeck } from "../endpoints/shared-decks";
import { decksQueryKeys } from "@/entities/deck";

export function createCopySharedDeckMutation() {
    return useMutation({
        mutationFn: (sharedDeckId: number) => copySharedDeck(sharedDeckId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: decksQueryKeys.all });
        },
        onError: () => {
            useToastStore().push("Failed to copy deck", "error", "error");
        },
    });
}
