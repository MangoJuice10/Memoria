import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { CreateFlashcardDto } from "src/flashcard/schemas";
import { setAccessToken } from "test/helpers/setAccessToken.helper";

export function createFlashcardsHelpers(
  httpServer: ReturnType<INestApplication["getHttpServer"]>,
  defaultCreateFlashcardDto: (...args: unknown[]) => CreateFlashcardDto,
) {
  const create = (
    deckId: number,
    accessToken: string,
    createFlashcardDto: Partial<CreateFlashcardDto> = defaultCreateFlashcardDto(),
  ) => {
    return setAccessToken(request(httpServer).post(`/decks/${deckId}/flashcards`), accessToken).send(
      createFlashcardDto,
    );
  };

  const findOne = (deckId: number, flashcardId: number, accessToken: string) => {
    return setAccessToken(
      request(httpServer).get(`/decks/${deckId}/flashcards/${flashcardId}`),
      accessToken,
    );
  };

  return {
    create,
    findOne,
  };
}
