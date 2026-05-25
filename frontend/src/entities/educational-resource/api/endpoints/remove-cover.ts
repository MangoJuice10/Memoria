import type {
    EducationalResourceResponseDto
} from "src/entities/educational-resource/model/educational-resource-response.dto.ts";
import {client, type SuccessResponse} from "@/shared/api";

export async function removeCover(educationalResourceId: number): Promise<EducationalResourceResponseDto> {
    const {data: {data}} = await client.delete<SuccessResponse<EducationalResourceResponseDto>>(`/educational-resources/${educationalResourceId}/cover`);
    return data;
}