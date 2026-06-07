import { client, type SuccessResponse } from "@/shared/api";
import type { SharedDeckResponseDto } from "../../model/shared-deck-response.dto";
import type { SharedDeckDetailResponseDto } from "../../model/shared-deck-detail-response.dto";
import type { DeckResponseDto } from "@/entities/deck";

export async function getSharedDecks(minRating?: number): Promise<SharedDeckResponseDto[]> {
    const params = minRating !== undefined ? { minRating } : {};
    const { data: { data } } = await client.get<SuccessResponse<SharedDeckResponseDto[]>>(
        "/shared-decks",
        { params }
    );
    return data;
}

export async function getSharedDeck(sharedDeckId: number): Promise<SharedDeckDetailResponseDto> {
    const { data: { data } } = await client.get<SuccessResponse<SharedDeckDetailResponseDto>>(
        `/shared-decks/${sharedDeckId}`
    );
    return data;
}

export async function copySharedDeck(sharedDeckId: number): Promise<DeckResponseDto> {
    const { data: { data } } = await client.post<SuccessResponse<DeckResponseDto>>(
        `/shared-decks/${sharedDeckId}/copy`
    );
    return data;
}
