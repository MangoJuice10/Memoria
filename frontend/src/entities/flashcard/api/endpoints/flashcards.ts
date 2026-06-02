import {client} from "@/shared/api";
import type {CreateFlashcardDto} from "../../model/schemas/create-flashcard.schema";
import type {GenerateFlashcardDto} from "../../model/schemas/generate-flashcard.schema";
import type {UpdateFlashcardDto} from "../../model/schemas/update-flashcard.schema";
import type {RegenerateFlashcardDto} from "../../model/schemas/regenerate-flashcard.schema";
import type {BatchFlashcardDto} from "../../model/dto/batch-flashcard.dto";
import type {SuccessResponse} from "@/shared/api";
import type {FlashcardResponseDto} from "../../model/dto/flashcard-response.dto";
import type {GeneratedFlashcardDto} from "../../model/dto/generated-flashcard.dto";
import type {BatchFlashcardResponseDto} from "../../model/dto/batch-flashcard-response.dto";

export async function create(deckId: number, createFlashcardDto: CreateFlashcardDto): Promise<FlashcardResponseDto> {
    const {data: {data}} = await client.post<SuccessResponse<FlashcardResponseDto>>(`/decks/${deckId}/flashcards`, createFlashcardDto);
    return data;
}

export async function generate(deckId: number, generateFlashcardDto: GenerateFlashcardDto): Promise<GeneratedFlashcardDto[]> {
    const {data: {data}} = await client.post<SuccessResponse<GeneratedFlashcardDto[]>>(`/decks/${deckId}/flashcards/generate`, generateFlashcardDto);
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

export async function regenerate(deckId: number, flashcardId: number, regenerateFlashcardDto: RegenerateFlashcardDto): Promise<GeneratedFlashcardDto> {
    const {data: {data}} = await client.post<SuccessResponse<GeneratedFlashcardDto>>(`/decks/${deckId}/flashcards/${flashcardId}/regenerate`, regenerateFlashcardDto);
    return data;
}

export async function remove(deckId: number, flashcardId: number) {
    await client.delete(`/decks/${deckId}/flashcards/${flashcardId}`);
}

export async function batch(deckId: number, batchFlashcardDto: BatchFlashcardDto): Promise<BatchFlashcardResponseDto> {
    const {data: {data}} = await client.post<SuccessResponse<BatchFlashcardResponseDto>>(`/decks/${deckId}/flashcards/batch`, batchFlashcardDto);
    return data;
}