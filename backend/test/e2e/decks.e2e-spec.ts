import request from "supertest";
import { createTestingApp, TestingApp } from "test/setup/create-testing-app";
import { createAuthHelpers } from "test/helpers/auth.helper";
import { createAuthFixtures } from "test/fixtures/auth.fixture";
import { createDecksHelpers } from "test/helpers/decks.helper";
import { createDecksFixtures } from "test/fixtures/decks.fixture";

describe("Deck", () => {
  let testingApp: TestingApp;
  let authHelpers: ReturnType<typeof createAuthHelpers>;
  let decksHelpers: ReturnType<typeof createDecksHelpers>;

  const username = "User";
  const email = "user@example.com";
  const password = "userPassword";

  const name = "Deck name";
  const description = "Deck's description";
  const isPublic = true;

  let accessToken: string;

  const { createRegisterDto, createLoginDto } = createAuthFixtures(username, email, password);
  const { createCreateDeckDto } = createDecksFixtures(name, description, isPublic);

  beforeAll(async () => {
    testingApp = await createTestingApp();
    await testingApp.prismaService.cleanDatabase();

    authHelpers = createAuthHelpers(testingApp.httpServer, createRegisterDto, createLoginDto);
    decksHelpers = createDecksHelpers(testingApp.httpServer, createCreateDeckDto);
  });

  afterEach(async () => {
    await testingApp.prismaService.cleanDatabase();
  });

  afterAll(async () => {
    await testingApp.app.close();
  });

  beforeEach(async () => {
    accessToken = authHelpers.retrieveAccessToken(await authHelpers.register());
  });

  describe("Create deck", () => {
    it("should create a deck", async () => {
      const response = await decksHelpers.createDeck(accessToken).expect(201);
      expect(response.body.data).toHaveProperty("name", name);
      expect(response.body.data).toHaveProperty("description", description);
      expect(response.body.data).toHaveProperty("isPublic", isPublic);
    });

    it("should update the deck", async () => {
      const newName = "New deck name";
      const newDescription = "New deck's description";
      const newIsPublic = false;

      const {
        body: {
          data: { id },
        },
      } = await decksHelpers.createDeck(accessToken);

      const response = await request(testingApp.httpServer)
        .patch(`/decks/${id}`)
        .set({
          Authorization: `Bearer ${accessToken}`,
        })
        .send({
          name: newName,
          description: newDescription,
          isPublic: newIsPublic,
        })
        .expect(200);
      expect(response.body.data).toHaveProperty("name", newName);
      expect(response.body.data).toHaveProperty("description", newDescription);
      expect(response.body.data).toHaveProperty("isPublic", newIsPublic);
    });
  });

  describe("Get deck by id", () => {});
  describe("Get decks", () => {});
  describe("Edit deck by id", () => {});
  describe("Delete deck by id", () => {});
});
