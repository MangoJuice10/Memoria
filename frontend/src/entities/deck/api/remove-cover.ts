import type {
    DeckResponseDto
} from "../model/deck-response.dto";
import {client, type SuccessResponse} from "@/shared/api";

export async function removeCover(deckId: number): Promise<DeckResponseDto> {
    const {data: {data}} = await client.delete<SuccessResponse<DeckResponseDto>>(`/decks/${deckId}/cover`);
    return data;
}