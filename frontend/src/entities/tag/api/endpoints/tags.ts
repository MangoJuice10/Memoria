import type {TagResponseDto} from "../../model/tag-response.dto";
import type {CreateTagDto} from "../../model/create-tag.schema";
import {client, type SuccessResponse} from "@/shared/api";

export async function getTagsByDeck(deckId: number): Promise<TagResponseDto[]> {
    const {data: {data}} = await client.get<SuccessResponse<TagResponseDto[]>>(`/decks/${deckId}/tags`);
    return data;
}

export async function getMyTags(): Promise<TagResponseDto[]> {
    const {data: {data}} = await client.get<SuccessResponse<TagResponseDto[]>>("/tags/my");
    return data;
}

export async function attachOrCreateTag(
    deckId: number,
    body: { id: number } | CreateTagDto
): Promise<TagResponseDto> {
    const {data: {data}} = await client.post<SuccessResponse<TagResponseDto>>(`/decks/${deckId}/tags`, body);
    return data;
}

export async function detachTag(deckId: number, tagId: number): Promise<void> {
    await client.delete(`/decks/${deckId}/tags/${tagId}`);
}
