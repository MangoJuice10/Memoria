import { default as request } from "supertest";
import { INestApplication } from "@nestjs/common";
import { CreateDeckDto, UpdateDeckDto } from "src/deck/schemas";

export function createDecksHelpers(
  httpServer: ReturnType<INestApplication["getHttpServer"]>,
  defaultCreateDeckDto: (...args: unknown[]) => CreateDeckDto,
) {
  const createDeck = (
    accessToken: string,
    createDeckDto: Partial<CreateDeckDto> = defaultCreateDeckDto(),
  ) => {
    return request(httpServer)
      .post("/decks")
      .set({
        Authorization: `Bearer ${accessToken}`,
      })
      .send(createDeckDto);
  };

  return {
    createDeck,
  };
}
