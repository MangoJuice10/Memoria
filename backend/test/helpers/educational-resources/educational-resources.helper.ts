import { INestApplication } from "@nestjs/common";
import { CreateEducationalResourceDto } from "src/educational-resource/schemas";
import { setAccessToken } from "test/helpers/setAccessToken.helper";
import request from "supertest";

export function createEducationalResourcesHelpers(
  httpServer: ReturnType<INestApplication["getHttpServer"]>,
  defaultCreateEducationalResourceDto: (...args: unknown[]) => CreateEducationalResourceDto,
) {
  const create = (
    accessToken: string,
    fileContent: string,
    filename: string,
    createEducationalResourceDto: CreateEducationalResourceDto = defaultCreateEducationalResourceDto(),
  ) => {
    return setAccessToken(request(httpServer).post("/educational-resources"), accessToken)
      .field("name", createEducationalResourceDto.name)
      .field("description", createEducationalResourceDto.description)
      .attach("file", Buffer.from(fileContent), filename);
  };

  const attachToDeck = (
    deckId: number,
    educationalResourceId: number,
    accessToken: string,
  ) => {
    return setAccessToken(
      request(httpServer).post(`/decks/${deckId}/educational-resources/${educationalResourceId}`),
      accessToken,
    );
  };

  const detachFromDeck = (
    deckId: number,
    educationalResourceId: number,
    accessToken: string,
  ) => {
    return setAccessToken(
      request(httpServer).delete(`/decks/${deckId}/educational-resources/${educationalResourceId}`),
      accessToken,
    );
  };

  const remove = (educationalResourceId: number, accessToken: string) => {
    return setAccessToken(
      request(httpServer).delete(`/educational-resources/${educationalResourceId}`),
      accessToken,
    );
  };

  return {
    create,
    attachToDeck,
    detachFromDeck,
    remove,
  };
}
