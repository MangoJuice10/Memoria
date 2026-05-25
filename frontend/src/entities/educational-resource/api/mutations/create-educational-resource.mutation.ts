import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api";
import {create} from "../endpoints/educational-resources";
import {educationalResourcesQueryKeys} from "@/entities/educational-resource/api/query-keys/educational-resources-query-keys.ts";
import type {CreateEducationalResourceDto} from "../../model/create-educational-resource.schema";
import type {EducationalResourceResponseDto} from "../../model/educational-resource-response.dto.ts";

export function createCreateEducationalResourceMutation() {
    return useMutation({
        mutationFn: (createEducationalResourceDto: CreateEducationalResourceDto) => create(createEducationalResourceDto),
        onSuccess: async (createdEducationalResource) => {
            await queryClient.setQueryData(
                educationalResourcesQueryKeys.all,
                (old: EducationalResourceResponseDto[] | undefined) => {
                    if (!old) return old;
                    return [...old, createdEducationalResource];
                }
            );
        }
    });
}