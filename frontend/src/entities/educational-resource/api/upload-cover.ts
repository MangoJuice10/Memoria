import type {
    EducationalResourceResponseDto
} from "../model/educational-resource-response.dto";
import {client, type SuccessResponse} from "@/shared/api";

export async function uploadCover(educationalResourceId: number, file: File): Promise<EducationalResourceResponseDto> {
    const formData = new FormData();
    formData.append("file", file);

    const {data: {data}} = await client.post<SuccessResponse<EducationalResourceResponseDto>>(
        `/educational-resources/${educationalResourceId}/cover`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    return data;
}