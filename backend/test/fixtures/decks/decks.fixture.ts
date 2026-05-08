import { CreateDeckDto, UpdateDeckDto } from "src/deck/schemas";

export function createDecksFixtures(
  name: string,
  description: string,
  isPublic: boolean,
) {
  const createCreateDeckDto = (overrides?: Partial<CreateDeckDto>): CreateDeckDto => {
    return {
      name,
      description,
      isPublic,
      ...overrides,
    };
  };

  return {
    createCreateDeckDto,
  };
}
