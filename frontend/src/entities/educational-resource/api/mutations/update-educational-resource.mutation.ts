import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api";
import {update} from "../endpoints/educational-resources";
import {educationalResourcesQueryKeys} from "@/entities/educational-resource";
import type {UpdateEducationalResourceDto} from "../../model/update-educational-resource.schema";
import type {EducationalResourceResponseDto} from "../../model/educational-resource-response.dto";

export function createUpdateEducationalResourceMutation() {
    return useMutation({
        mutationFn: ({educationalResourceId, updateEducationalResourceDto}: {
            educationalResourceId: number;
            updateEducationalResourceDto: UpdateEducationalResourceDto
        }) => update(educationalResourceId, updateEducationalResourceDto),
        onSuccess: async (updatedEducationalResource) => {
            await queryClient.setQueryData(
                educationalResourcesQueryKeys.all,
                (old: EducationalResourceResponseDto[] | undefined) => {
                    if (!old) return old;
                    return old.map((educationalResource) => educationalResource.id === updatedEducationalResource.id ? updatedEducationalResource : educationalResource);
                }
            );
        }
    });
}