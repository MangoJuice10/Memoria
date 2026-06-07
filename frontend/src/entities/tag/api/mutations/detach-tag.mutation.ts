import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api";
import {detachTag} from "../endpoints/tags";
import {tagsQueryKeys} from "../query-keys/tags-query-keys";
/* ===== AI GENERATED CODE START ===== */
import {decksQueryKeys} from "@/entities/deck";
/* ===== AI GENERATED CODE END ===== */

export function createDetachTagMutation(deckId: number) {
    return useMutation({
        mutationFn: (tagId: number) => detachTag(deckId, tagId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: tagsQueryKeys.byDeck(deckId)});
            /* ===== AI GENERATED CODE START ===== */
            await queryClient.invalidateQueries({queryKey: decksQueryKeys.all});
            /* ===== AI GENERATED CODE END ===== */
        },
    });
}
