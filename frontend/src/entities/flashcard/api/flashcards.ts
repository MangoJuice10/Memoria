import type {
    CreateFlashcardDto,
    UpdateFlashcardDto,
    FlashcardResponseDto
} from "@/entities/flashcard";
import type {SuccessResponse} from "@/shared/api";
import {client} from "@/shared/api";

export async function create(deckId: number, createFlashcardDto: CreateFlashcardDto): Promise<FlashcardResponseDto> {
    const {data: {data}} = await client.post<SuccessResponse<FlashcardResponseDto>>(`/decks/${deckId}/flashcards`, createFlashcardDto);
    return data;
}

export async function findOne(deckId: number, flashcardId: number): Promise<FlashcardResponseDto> {
    const {data: {data}} = await client.get<SuccessResponse<FlashcardResponseDto>>(`/decks/${deckId}/flashcards/${flashcardId}`);
    return data;
}

export async function findAll(deckId: number): Promise<FlashcardResponseDto[]> {
    const {data: {data}} = await client.get<SuccessResponse<FlashcardResponseDto[]>>(`/decks/${deckId}/flashcards`);
    return data;
}

export async function update(deckId: number, flashcardId: number, updateFlashcardDto: UpdateFlashcardDto) {
    const {data: {data}} = await client.patch<SuccessResponse<FlashcardResponseDto>>(`/decks/${deckId}/flashcards/${flashcardId}`, updateFlashcardDto);
    return data;
}

export async function remove(deckId: number, flashcardId: number) {
    await client.delete(`/decks/${deckId}/flashcards/${flashcardId}`);
}