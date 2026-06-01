import type {
    CreateFlashcardDto,
    UpdateFlashcardDto,
    FlashcardResponseDto
} from "@/entities/flashcard";
import type {
    BatchFlashcardResponseDto
} from "@/entities/flashcard/model/dtos/batch-flashcard-response.dto";
import type {
    GenerateFlashcardDto
} from "@/entities/flashcard/model/schemas/generate-flashcard.schema";
import type {BatchFlashcardDto} from "../../model/dtos/batch-flashcard.dto";
import type {SuccessResponse} from "@/shared/api";
import {client} from "@/shared/api";

export async function create(deckId: number, createFlashcardDto: CreateFlashcardDto): Promise<FlashcardResponseDto> {
    const {data: {data}} = await client.post<SuccessResponse<FlashcardResponseDto>>(`/decks/${deckId}/flashcards`, createFlashcardDto);
    return data;
}

export async function generate(deckId: number, generateFlashcardDto: GenerateFlashcardDto): Promise<FlashcardResponseDto[]> {
    const {data: {data}} = await client.post<SuccessResponse<FlashcardResponseDto[]>>(`/decks/${deckId}/flashcards/generate`, generateFlashcardDto);
    return data;
}

export async function findOne(deckId: number, flashcardId: number): Promise<FlashcardResponseDto> {
    const {data: {data}} = await client.get<SuccessResponse<FlashcardResponseDto>>(`/decks/${deckId}/flashcards/${flashcardId}`);
    return data;
}

export async function findAll(deckId: number, search?: string): Promise<FlashcardResponseDto[]> {
    const {data: {data}} = await client.get<SuccessResponse<FlashcardResponseDto[]>>(`/decks/${deckId}/flashcards`, {
        params: search ? {
            search
        } : undefined
    });
    return data;
}

export async function update(deckId: number, flashcardId: number, updateFlashcardDto: UpdateFlashcardDto) {
    const {data: {data}} = await client.patch<SuccessResponse<FlashcardResponseDto>>(`/decks/${deckId}/flashcards/${flashcardId}`, updateFlashcardDto);
    return data;
}

export async function remove(deckId: number, flashcardId: number) {
    await client.delete(`/decks/${deckId}/flashcards/${flashcardId}`);
}

export async function batch(deckId: number, batchFlashcardDto: BatchFlashcardDto): Promise<BatchFlashcardResponseDto> {
    const {data: {data}} = await client.post<SuccessResponse<BatchFlashcardResponseDto>>(`/decks/${deckId}/flashcards/batch`, batchFlashcardDto);
    return data;
}