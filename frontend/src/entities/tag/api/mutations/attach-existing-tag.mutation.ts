import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api";
import {attachOrCreateTag} from "../endpoints/tags";
import {tagsQueryKeys} from "../query-keys/tags-query-keys";
/* ===== AI GENERATED CODE START ===== */
import {decksQueryKeys} from "@/entities/deck";
/* ===== AI GENERATED CODE END ===== */

export function createAttachExistingTagMutation(deckId: number) {
    return useMutation({
        mutationFn: (tagId: number) => attachOrCreateTag(deckId, {id: tagId}),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: tagsQueryKeys.byDeck(deckId)});
            /* ===== AI GENERATED CODE START ===== */
            await queryClient.invalidateQueries({queryKey: decksQueryKeys.all});
            /* ===== AI GENERATED CODE END ===== */
        },
    });
}
