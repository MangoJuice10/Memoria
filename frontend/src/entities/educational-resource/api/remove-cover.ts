import type {
    EducationalResourceResponseDto
} from "../model/educational-resource-response.dto";
import {client, type SuccessResponse} from "@/shared/api";

export async function removeCover(educationalResourceId: number): Promise<EducationalResourceResponseDto> {
    const {data: {data}} = await client.delete<SuccessResponse<EducationalResourceResponseDto>>(`/educational-resources/${educationalResourceId}/cover`);
    return data;
}