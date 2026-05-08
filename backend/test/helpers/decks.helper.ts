import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { CreateDeckDto, UpdateDeckDto } from "src/deck/schemas";
import { setAccessToken } from "./setAccessToken.helper";

export function createDecksHelpers(
  httpServer: ReturnType<INestApplication["getHttpServer"]>,
  defaultCreateDeckDto: (...args: unknown[]) => CreateDeckDto,
) {
  const create = (
    accessToken: string,
    createDeckDto: Partial<CreateDeckDto> = defaultCreateDeckDto(),
  ) => {
    return setAccessToken(request(httpServer).post("/decks"), accessToken).send(createDeckDto);
  };

  const findOne = (id: number, accessToken: string) => {
    return setAccessToken(request(httpServer).get(`/decks/${id}`), accessToken);
  };

  return {
    create,
    findOne,
  };
}
