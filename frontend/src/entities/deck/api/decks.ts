import type {CreateDeckDto, DeckResponseDto, UpdateDeckDto} from "@/entities/deck";
import {client, type SuccessResponse} from "@/shared/api";

export async function create(createDeckDto: CreateDeckDto): Promise<DeckResponseDto> {
    const {data: {data}} = await client.post<SuccessResponse<DeckResponseDto>>("/decks", createDeckDto);
    return data;
}

export async function findOne(deckId: number): Promise<DeckResponseDto> {
    const {data: {data}} = await client.get<SuccessResponse<DeckResponseDto>>(`/decks/${deckId}`);
    return data;
}

export async function findAll(): Promise<DeckResponseDto[]> {
    const {data: {data}} = await client.get<SuccessResponse<DeckResponseDto[]>>("/decks");
    return data;
}

export async function update(deckId: number, updateDeckDto: UpdateDeckDto): Promise<DeckResponseDto> {
    const {data: {data}} = await client.patch<SuccessResponse<DeckResponseDto>>(`/decks/${deckId}`, updateDeckDto);
    return data;
}

export async function remove(deckId: number) {
    await client.delete(`/decks/${deckId}`);
}
