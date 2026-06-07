import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api";
import {attachOrCreateTag} from "../endpoints/tags";
import {tagsQueryKeys} from "../query-keys/tags-query-keys";
import type {CreateTagDto} from "../../model/create-tag.schema";
/* ===== AI GENERATED CODE START ===== */
import {decksQueryKeys} from "@/entities/deck";
/* ===== AI GENERATED CODE END ===== */

export function createCreateAndAttachTagMutation(deckId: number) {
    return useMutation({
        mutationFn: (createTagDto: CreateTagDto) => attachOrCreateTag(deckId, createTagDto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: tagsQueryKeys.byDeck(deckId)});
            /* ===== AI GENERATED CODE START ===== */
            await queryClient.invalidateQueries({queryKey: decksQueryKeys.all});
            /* ===== AI GENERATED CODE END ===== */
        },
    });
}
