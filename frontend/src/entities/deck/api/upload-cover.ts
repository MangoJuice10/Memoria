import type {DeckResponseDto} from "@/entities/deck";
import {client, type SuccessResponse} from "@/shared/api";

export async function uploadCover(deckId: number, file: File): Promise<DeckResponseDto> {
    const formData = new FormData();
    formData.append("file", file);

    const {data: {data}} = await client.post<SuccessResponse<DeckResponseDto>>(
        `/decks/${deckId}/cover`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    return data;
}