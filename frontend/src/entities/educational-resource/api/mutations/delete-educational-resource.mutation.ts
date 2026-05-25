import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api";
import {remove} from "../endpoints/educational-resources";
import {educationalResourcesQueryKeys} from "../query-keys/educational-resources-query-keys";
import type {EducationalResourceResponseDto} from "../../model/educational-resource-response.dto";

export function createDeleteEducationalResourceMutation() {
    return useMutation({
        mutationFn: (educationalResourceId: number) => remove(educationalResourceId),
        onSuccess: async (_, variables) => {
            await queryClient.setQueryData(
                educationalResourcesQueryKeys.all,
                (old: EducationalResourceResponseDto[] | undefined) => {
                    if (!old) return old;
                    return old.filter(({id}) => id !== variables);
                }
            );
        },
    });
}