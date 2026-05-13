import request from "supertest";
import { createTestingApp, TestingApp } from "test/setup/create-testing-app";
import { createAuthHelpers } from "test/helpers/auth/auth.helper";
import { createAuthFixtures } from "test/fixtures/auth/auth.fixture";
import { createDecksHelpers } from "test/helpers/decks/decks.helper";
import { createDecksFixtures } from "test/fixtures/decks/decks.fixture";
import { setAccessToken } from "test/helpers/setAccessToken.helper";
import { defaultAuthData } from "test/fixtures/auth/auth.data";
import { defaultDecksData, newDecksData } from "test/fixtures/decks/decks.data";

describe("Deck", () => {
  let testingApp: TestingApp;
  let authHelpers: ReturnType<typeof createAuthHelpers>;
  let decksHelpers: ReturnType<typeof createDecksHelpers>;

  const { username, email, password, otherEmail } = defaultAuthData;
  const { name, description, isPublic } = defaultDecksData;

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

    it("should fail to create a deck if a required field is missing", async () => {
      const { name, ...missingFieldCreateDeckDto } = createCreateDeckDto();
      await decksHelpers.create(accessToken, missingFieldCreateDeckDto).expect(422);
    });

    it("should fail to create a deck if there is an extra field", async () => {
      const extraFieldCreateDeckDto = { extraField: "extra", ...createCreateDeckDto() };
      await decksHelpers.create(accessToken, extraFieldCreateDeckDto).expect(422);
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

      await decksHelpers.findOne(id, accessToken).expect(404);
      await decksHelpers.findOne(id, otherAccessToken).expect(200);
    });
  });

  describe("Update deck by id", () => {
    const { newName, newDescription, newIsPublic } = newDecksData;

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

    it("should fail to update a deck that doesn't exist with a 404 status code", async () => {
      const invalidId = 0;

      await setAccessToken(request(testingApp.httpServer).patch(`/decks/${invalidId}`), accessToken)
        .send({
          name: newName,
          description: newDescription,
          isPublic: newIsPublic,
        })
        .expect(404);
    });

    it("should fail to update another user's deck with a 404 status code", async () => {
      const {
        body: {
          data: { id },
        },
      } = await decksHelpers.create(otherAccessToken);

      await setAccessToken(request(testingApp.httpServer).patch(`/decks/${id}`), accessToken)
        .send({
          name: newName,
          description: newDescription,
          isPublic: newIsPublic,
        })
        .expect(404);

      await setAccessToken(request(testingApp.httpServer).patch(`/decks/${id}`), otherAccessToken)
        .send({
          name: newName,
          description: newDescription,
          isPublic: newIsPublic,
        })
        .expect(200);
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

    it("should fail to delete a deck that doesn't exist with a 404 Not Found status code", async () => {
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
        accessToken,
      ).expect(404);

      await setAccessToken(
        request(testingApp.httpServer).delete(`/decks/${id}`),
        otherAccessToken,
      ).expect(204);
    });
  });
});
