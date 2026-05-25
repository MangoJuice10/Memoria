import {client, type SuccessResponse} from "@/shared/api";
import type {CreateEducationalResourceDto} from "../../model/create-educational-resource.schema";
import type {UpdateEducationalResourceDto} from "../../model/update-educational-resource.schema";
import type {EducationalResourceResponseDto} from "../../model/educational-resource-response.dto";

export async function create(createEducationalResourceDto: CreateEducationalResourceDto): Promise<EducationalResourceResponseDto> {
    const formData = new FormData();
    Object.entries(createEducationalResourceDto).forEach(([key, value]) => {
        formData.append(key, value);
    });

    const {data: {data}} = await client.post<SuccessResponse<EducationalResourceResponseDto>>(
        "/educational-resources",
        formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

    return data;
}

export async function findAll(): Promise<EducationalResourceResponseDto[]> {
    const {data: {data}} = await client.get<SuccessResponse<EducationalResourceResponseDto[]>>("/educational-resources");
    return data;
}

export async function findAllByDeck(deckId: number): Promise<EducationalResourceResponseDto[]> {
    const {data: {data}} = await client.get<SuccessResponse<EducationalResourceResponseDto[]>>(
        `/decks/${deckId}/educational-resources`
    );
    return data;
}

export async function update(educationalResourceId: number, updateEducationalResourceDto: UpdateEducationalResourceDto): Promise<EducationalResourceResponseDto> {
    const {data: {data}} = await client.patch<SuccessResponse<EducationalResourceResponseDto>>(
        `/educational-resources/${educationalResourceId}`,
        updateEducationalResourceDto
    );
    return data;
}

export async function attachToDeck(deckId: number, educationalResourceId: number) {
    await client.post(`/decks/${deckId}/educational-resources/${educationalResourceId}`);
}

export async function detachFromDeck(deckId: number, educationalResourceId: number) {
    await client.delete(`/decks/${deckId}/educational-resources/${educationalResourceId}`);
}

export async function remove(educationalResourceId: number) {
    await client.delete(`/educational-resources/${educationalResourceId}`);
}
