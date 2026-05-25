import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api";
import {uploadCover} from "../endpoints/upload-cover";
import {educationalResourcesQueryKeys} from "../query-keys/educational-resources-query-keys";
import type {EducationalResourceResponseDto} from "../../model/educational-resource-response.dto";

export function createUploadEducationalResourceCoverMutation() {
    return useMutation({
        mutationFn: ({educationalResourceId, file}: {
            educationalResourceId: number;
            file: File;
        }) => uploadCover(educationalResourceId, file),
        onSuccess: async (updatedEducationalResource) => {
            await queryClient.setQueryData(
                educationalResourcesQueryKeys.all,
                (old: EducationalResourceResponseDto[] | undefined) => {
                    if (!old) return old;
                    return old.map((educationalResource) => educationalResource.id === updatedEducationalResource.id ? updatedEducationalResource : educationalResource);
                }
            );
        }
    })
}