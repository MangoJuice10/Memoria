import request from "supertest";
import { createTestingApp, TestingApp } from "test/setup/create-testing-app";
import { createAuthHelpers } from "test/helpers/auth.helper";
import { createAuthFixtures } from "test/fixtures/auth.fixture";

describe("Deck", () => {
  let testingApp: TestingApp;
  let helpers: ReturnType<typeof createAuthHelpers>;
  const email = "user@example.com";
  const password = "userPassword";

  beforeAll(async () => {
    testingApp = await createTestingApp();
    await testingApp.prismaService.cleanDatabase();
    const { createRegisterDto, createLoginDto } = createAuthFixtures(email, password);
    helpers = createAuthHelpers(testingApp.httpServer, createRegisterDto, createLoginDto);
  });

  afterEach(async () => {
    await testingApp.prismaService.cleanDatabase();
  });

  afterAll(async () => {
    await testingApp.app.close();
  });

  let accessToken: string;

  beforeEach(async () => {
    accessToken = helpers.retrieveAccessToken(await helpers.register());
  });

  describe("Create deck", () => {
    it.todo("should create a deck");
  });
  describe("Get deck by id", () => {});
  describe("Get decks", () => {});
  describe("Edit deck by id", () => {});
  describe("Delete deck by id", () => {});
});
