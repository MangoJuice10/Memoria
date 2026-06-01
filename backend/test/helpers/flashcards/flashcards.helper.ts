import request from "supertest";
import { INestApplication } from "@nestjs/common";
import {
  BulkCreateFlashcardsDto,
  CreateFlashcardDto,
  GenerateFlashcardDto,
} from "src/flashcard/schemas";
import { setAccessToken } from "test/helpers/setAccessToken.helper";
import { BatchFlashcardInput } from "src/flashcard/schemas/batch-flashcard.schema";
import { BatchFlashcardResponseDto } from "src/flashcard/schemas/batch-flashcard-response.dto";

export function createFlashcardsHelpers(
  httpServer: ReturnType<INestApplication["getHttpServer"]>,
  defaultCreateFlashcardDto: (...args: unknown[]) => CreateFlashcardDto,
  defaultBatchFlashcardDto: (...args: unknown[]) => BatchFlashcardInput,
) {
  const create = (
    deckId: number,
    accessToken: string,
    createFlashcardDto: Partial<CreateFlashcardDto> = defaultCreateFlashcardDto(),
  ) => {
    return setAccessToken(
      request(httpServer).post(`/decks/${deckId}/flashcards`),
      accessToken,
    ).send(createFlashcardDto);
  };

  const generate = (
    deckId: number,
    accessToken: string,
    generateFlashcardsDto: GenerateFlashcardDto,
  ) => {
    return setAccessToken(
      request(httpServer).post(`/decks/${deckId}/flashcards/generate`),
      accessToken,
    ).send(generateFlashcardsDto);
  };

  const bulkCreate = (
    deckId: number,
    accessToken: string,
    bulkCreateFlashcardsDto: BulkCreateFlashcardsDto,
  ) => {
    return setAccessToken(
      request(httpServer).post(`/decks/${deckId}/flashcards/bulk`),
      accessToken,
    ).send(bulkCreateFlashcardsDto);
  };

  const findOne = (deckId: number, flashcardId: number, accessToken: string) => {
    return setAccessToken(
      request(httpServer).get(`/decks/${deckId}/flashcards/${flashcardId}`),
      accessToken,
    );
  };

  const batch = (
    deckId: number,
    accessToken: string,
    batchFlashcardDto: Partial<BatchFlashcardInput> = defaultBatchFlashcardDto(),
  ) => {
    return setAccessToken(
      request(httpServer).post(`/decks/${deckId}/flashcards/batch`).send(batchFlashcardDto),
      accessToken,
    );
  };

  return {
    create,
    findOne,
    generate,
    bulkCreate,
    batch,
  };
}
