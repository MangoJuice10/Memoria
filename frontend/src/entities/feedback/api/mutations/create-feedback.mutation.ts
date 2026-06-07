import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api";
import {createFeedback} from "../endpoints/feedback";
import type {CreateFeedbackDto} from "../../model/create-feedback.schema";
import {sharedDecksQueryKeys} from "@/entities/shared-deck";

export function createCreateFeedbackMutation(sharedDeckId: number) {
    return useMutation({
        mutationFn: (dto: CreateFeedbackDto) => createFeedback(sharedDeckId, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: sharedDecksQueryKeys.detail(sharedDeckId)});
        },
    });
}
