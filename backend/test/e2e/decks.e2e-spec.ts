import request from "supertest";
import { createTestingApp, TestingApp } from "test/setup/create-testing-app";
import { createAuthHelpers } from "test/helpers/auth.helper";
import { createAuthFixtures } from "test/fixtures/auth.fixture";
import { createDecksHelpers } from "test/helpers/decks.helper";
import { createDecksFixtures } from "test/fixtures/decks.fixture";
import { setAccessToken } from "test/helpers/setAccessToken.helper";

describe("Deck", () => {
  let testingApp: TestingApp;
  let authHelpers: ReturnType<typeof createAuthHelpers>;
  let decksHelpers: ReturnType<typeof createDecksHelpers>;

  const username = "User";
  const email = "user@example.com";
  const password = "userPassword";

  const otherEmail = "otheruser@example.com";

  const name = "Deck name";
  const description = "Deck's description";
  const isPublic = true;

  let accessToken: string;
  let otherAccessToken: string;

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
    otherAccessToken = authHelpers.retrieveAccessToken(
      await authHelpers.register(
        createRegisterDto({
          email: otherEmail,
        }),
      ),
    );
  });

  describe("Create deck", () => {
    it("should create a deck", async () => {
      const res = await decksHelpers.create(accessToken).expect(201);
      expect(res.body.data).toHaveProperty("name", name);
      expect(res.body.data).toHaveProperty("description", description);
      expect(res.body.data).toHaveProperty("isPublic", isPublic);
    });
  });

  describe("Get deck by id", () => {
    it("should get one deck", async () => {
      const {
        body: {
          data: { id },
        },
      } = await decksHelpers.create(accessToken);

      const res = await decksHelpers.findOne(id, accessToken).expect(200);
      expect(res.body.data).toHaveProperty("id", id);
      expect(res.body.data).toHaveProperty("name", name);
      expect(res.body.data).toHaveProperty("description", description);
      expect(res.body.data).toHaveProperty("isPublic", isPublic);
    });

    it("should fail to get another user's deck with a 404 status code", async () => {
      const {
        body: {
          data: { id },
        },
      } = await decksHelpers.create(otherAccessToken);

      await decksHelpers.findOne(id, otherAccessToken).expect(200);
      await decksHelpers.findOne(id, accessToken).expect(404);
    });
  });

  describe("Get all decks", () => {
    it("should get all decks", async () => {
      const DECKS_NUM = 10;
      for (let i = 0; i < DECKS_NUM; i++) {
        await decksHelpers.create(accessToken);
      }

      const res = await setAccessToken(
        request(testingApp.httpServer).get("/decks"),
        accessToken,
      ).expect(200);
      expect(res.body.data).toHaveLength(DECKS_NUM);
    });
  });

  describe("Update deck by id", () => {
    const newName = "New deck name";
    const newDescription = "New deck's description";
    const newIsPublic = false;

    it("should update the deck", async () => {
      const {
        body: {
          data: { id },
        },
      } = await decksHelpers.create(accessToken);

      const res = await setAccessToken(
        request(testingApp.httpServer).patch(`/decks/${id}`),
        accessToken,
      )
        .send({
          name: newName,
          description: newDescription,
          isPublic: newIsPublic,
        })
        .expect(200);
      expect(res.body.data).toHaveProperty("name", newName);
      expect(res.body.data).toHaveProperty("description", newDescription);
      expect(res.body.data).toHaveProperty("isPublic", newIsPublic);
    });

    it("should fail to update another user's deck with a 404 status code", async () => {
      const {
        body: {
          data: { id },
        },
      } = await decksHelpers.create(otherAccessToken);

      await setAccessToken(request(testingApp.httpServer).patch(`/decks/${id}`), otherAccessToken)
        .send({
          name: newName,
          description: newDescription,
          isPublic: newIsPublic,
        })
        .expect(200);

      await setAccessToken(request(testingApp.httpServer).patch(`/decks/${id}`), accessToken)
        .send({
          name: newName,
          description: newDescription,
          isPublic: newIsPublic,
        })
        .expect(404);
    });
  });

  describe("Delete deck by id", () => {
    it("should delete the deck", async () => {
      const {
        body: {
          data: { id },
        },
      } = await decksHelpers.create(accessToken);

      await setAccessToken(
        request(testingApp.httpServer).delete(`/decks/${id}`),
        accessToken,
      ).expect(204);

      await decksHelpers.findOne(id, accessToken).expect(404);
    });

    it("should fail to delete the deck with a 404 Not Found status code", async () => {
      const invalidId = 0;

      await setAccessToken(
        request(testingApp.httpServer).delete(`/decks/${invalidId}`),
        accessToken,
      ).expect(404);
    });

    it("should fail to delete another user's deck with a 404 status code", async () => {
      const {
        body: {
          data: { id },
        },
      } = await decksHelpers.create(otherAccessToken);

      await setAccessToken(
        request(testingApp.httpServer).delete(`/decks/${id}`),
        otherAccessToken,
      ).expect(204);

      await setAccessToken(
        request(testingApp.httpServer).delete(`/decks/${id}`),
        accessToken,
      ).expect(404);
    });
  });
});
