import { CreateEducationalResourceDto } from "src/educational-resource/schemas";

export function createEducationalResourcesFixtures(name: string, description: string) {
  const createCreateEducationalResourceDto = (
    overrides?: Partial<CreateEducationalResourceDto>,
  ): CreateEducationalResourceDto => ({
    name,
    description,
    ...overrides,
  });

  return {
    createCreateEducationalResourceDto,
  };
}
