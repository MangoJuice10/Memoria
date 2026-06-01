import request from "supertest";
import { createTestingApp, TestingApp } from "test/setup/create-testing-app";
import { createAuthHelpers } from "test/helpers/auth/auth.helper";
import { createFlashcardsHelpers } from "test/helpers/flashcards/flashcards.helper";
import { defaultAuthData } from "test/fixtures/auth/auth.data";
import {
  defaultFlashcardsData,
  newFlashcardsData,
  defaultFlashcardData,
  newFlashcardData,
} from "test/fixtures/flashcards/flashcards.data";
import { createAuthFixtures } from "test/fixtures/auth/auth.fixture";
import { createFlashcardsFixtures } from "test/fixtures/flashcards/flashcards.fixture";
import { defaultDecksData } from "test/fixtures/decks/decks.data";
import { createDecksHelpers } from "test/helpers/decks/decks.helper";
import { createDecksFixtures } from "test/fixtures/decks/decks.fixture";
import { setAccessToken } from "test/helpers/setAccessToken.helper";
import { createFlashcardGenerationPrompt } from "src/flashcard/providers";
import {
  BatchFlashcardDto,
  BatchFlashcardInput,
} from "src/flashcard/schemas/batch-flashcard.schema";
import { BatchFlashcardResponseDto } from "src/flashcard/schemas/batch-flashcard-response.dto";
import { bulkCreateFlashcardsSchema } from "src/flashcard/schemas";

describe("Flashcards", () => {
  let testingApp: TestingApp;
  let authHelpers: ReturnType<typeof createAuthHelpers>;
  let decksHelpers: ReturnType<typeof createDecksHelpers>;
  let flashcardsHelpers: ReturnType<typeof createFlashcardsHelpers>;

  const { username, email, password, otherEmail } = defaultAuthData;
  const { name, description, isPublic } = defaultDecksData;
  const { front, back } = defaultFlashcardData;
  const { newFront, newBack } = newFlashcardData;

  let accessToken: string;
  let otherAccessToken: string;
  let deckId: number;

  const { createLoginDto, createRegisterDto } = createAuthFixtures(username, email, password);
  const { createCreateDeckDto } = createDecksFixtures(name, description, isPublic);
  const { createCreateFlashcardDto, createBatchFlashcardDto } = createFlashcardsFixtures(
    { front, back },
    defaultFlashcardsData,
  );

  beforeAll(async () => {
    testingApp = await createTestingApp();
    await testingApp.prismaService.cleanDatabase();

    authHelpers = createAuthHelpers(testingApp.httpServer, createRegisterDto, createLoginDto);
    decksHelpers = createDecksHelpers(testingApp.httpServer, createCreateDeckDto);
    flashcardsHelpers = createFlashcardsHelpers(
      testingApp.httpServer,
      createCreateFlashcardDto,
      createBatchFlashcardDto,
    );
  });

  afterEach(async () => {
    await testingApp.prismaService.cleanDatabase();
  });

  afterAll(async () => {
    await testingApp.prismaService.cleanDatabase();
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
    ({
      body: {
        data: { id: deckId },
      },
    } = await decksHelpers.create(accessToken));
  });

  describe("Create Flashcard", () => {
    it("should create a flashcard", async () => {
      const res = await flashcardsHelpers.create(deckId, accessToken).expect(201);
      expect(res.body.data).toHaveProperty("front", front);
      expect(res.body.data).toHaveProperty("back", back);
    });

    it("should fail to create a flashcard if a required field is missing", async () => {
      const { front, ...missingFieldCreateFlashcardDto } = createCreateFlashcardDto();
      await flashcardsHelpers
        .create(deckId, accessToken, missingFieldCreateFlashcardDto)
        .expect(422);
    });

    it("should fail to create a flashcard if there is an extra field", async () => {
      const extraCreateFlashcardDto = { extraField: "extra", ...createCreateFlashcardDto() };
      await flashcardsHelpers.create(deckId, accessToken, extraCreateFlashcardDto).expect(422);
    });
  });

  describe("Bulk create flashcards", () => {
    it("should bulk create flashcards", async () => {
      const res = await flashcardsHelpers
        .bulkCreate(deckId, accessToken, {
          flashcards: defaultFlashcardsData,
        })
        .expect(201);

      expect(res.body.data).toHaveLength(defaultFlashcardsData.length);
      for (let i = 0; i < defaultFlashcardsData.length; i++) {
        expect(res.body.data[i]).toHaveProperty("front", defaultFlashcardsData[i].front);
        expect(res.body.data[i]).toHaveProperty("back", defaultFlashcardsData[i].back);
      }
    });
  });

  describe("Get all flashcards", () => {
    it("should get all flashcards", async () => {
      const FLASHCARDS_NUM = 10;
      for (let i = 0; i < FLASHCARDS_NUM; i++) {
        await flashcardsHelpers.create(deckId, accessToken);
      }

      const res = await setAccessToken(
        request(testingApp.httpServer).get(`/decks/${deckId}/flashcards`),
        accessToken,
      ).expect(200);

      expect(res.body.data).toHaveLength(FLASHCARDS_NUM);
    });
  });

  describe("Get flashcard by id", () => {
    it("should get one flashcard", async () => {
      const {
        body: {
          data: { id },
        },
      } = await flashcardsHelpers.create(deckId, accessToken);

      const res = await flashcardsHelpers.findOne(deckId, id, accessToken).expect(200);
      expect(res.body.data).toHaveProperty("front", front);
      expect(res.body.data).toHaveProperty("back", back);
    });

    it("should fail to get the flashcard with the status code 404 when the deck doesn't belong the the user", async () => {
      const {
        body: {
          data: { id },
        },
      } = await flashcardsHelpers.create(deckId, accessToken);

      await flashcardsHelpers.findOne(deckId, id, otherAccessToken).expect(404);
      await flashcardsHelpers.findOne(deckId, id, accessToken).expect(200);
    });

    it(
      "should fail to get the flashcard with the status code 404 when the deck belongs to the user, but the flashcard doesn't" +
        " belong to the deck",
      async () => {
        const {
          body: {
            data: { id: otherDeckId },
          },
        } = await decksHelpers.create(otherAccessToken);

        const {
          body: {
            data: { id: otherFlashcardId },
          },
        } = await flashcardsHelpers.create(otherDeckId, otherAccessToken);

        await flashcardsHelpers.findOne(deckId, otherFlashcardId, accessToken).expect(404);
      },
    );
  });

  describe("Update Flashcard", () => {
    it("should update the flashcard", async () => {
      const {
        body: {
          data: { id },
        },
      } = await flashcardsHelpers.create(deckId, accessToken);

      const res = await setAccessToken(
        request(testingApp.httpServer).patch(`/decks/${deckId}/flashcards/${id}`),
        accessToken,
      )
        .send({
          front: newFront,
          back: newBack,
        })
        .expect(200);
      expect(res.body.data).toHaveProperty("front", newFront);
      expect(res.body.data).toHaveProperty("back", newBack);
    });

    it("should fail to update the flashcard with the status code 404 when the deck doesn't belong the the user", async () => {
      const {
        body: {
          data: { id },
        },
      } = await flashcardsHelpers.create(deckId, accessToken);

      await setAccessToken(
        request(testingApp.httpServer).patch(`/decks/${deckId}/flashcards/${id}`),
        otherAccessToken,
      )
        .send({
          front: newFront,
          back: newBack,
        })
        .expect(404);

      await setAccessToken(
        request(testingApp.httpServer).patch(`/decks/${deckId}/flashcards/${id}`),
        accessToken,
      )
        .send({
          front: newFront,
          back: newBack,
        })
        .expect(200);
    });

    it(
      "should fail to update the flashcard with the status code 404 when the deck belongs to the user, but the flashcard" +
        " doesn't belong to the deck",
      async () => {
        const {
          body: {
            data: { id: otherDeckId },
          },
        } = await decksHelpers.create(otherAccessToken);

        const {
          body: {
            data: { id: otherFlashcardId },
          },
        } = await flashcardsHelpers.create(otherDeckId, otherAccessToken);

        await setAccessToken(
          request(testingApp.httpServer).patch(`/decks/${deckId}/flashcards/${otherFlashcardId}`),
          accessToken,
        )
          .send({
            front: newFront,
            back: newBack,
          })
          .expect(404);
      },
    );
  });

  describe("Delete Flashcard", () => {
    it("should delete the flashcard", async () => {
      const {
        body: {
          data: { id },
        },
      } = await flashcardsHelpers.create(deckId, accessToken);

      await setAccessToken(
        request(testingApp.httpServer).delete(`/decks/${deckId}/flashcards/${id}`),
        accessToken,
      ).expect(204);

      await flashcardsHelpers.findOne(deckId, id, accessToken).expect(404);
    });

    it("should fail to delete the flashcard with the status code 404 when the deck doesn't belong the the user", async () => {
      const {
        body: {
          data: { id },
        },
      } = await flashcardsHelpers.create(deckId, accessToken);

      await setAccessToken(
        request(testingApp.httpServer).delete(`/decks/${deckId}/flashcards/${id}`),
        otherAccessToken,
      ).expect(404);

      await setAccessToken(
        request(testingApp.httpServer).delete(`/decks/${deckId}/flashcards/${id}`),
        accessToken,
      ).expect(204);
    });

    it(
      "should fail to delete the flashcard with the status code 404 when the deck belongs to the user, but the flashcard" +
        " doesn't belong to the deck",
      async () => {
        const {
          body: {
            data: { id: otherDeckId },
          },
        } = await decksHelpers.create(otherAccessToken);

        const {
          body: {
            data: { id: otherFlashcardId },
          },
        } = await flashcardsHelpers.create(otherDeckId, otherAccessToken);

        await setAccessToken(
          request(testingApp.httpServer).delete(`/decks/${deckId}/flashcards/${otherFlashcardId}`),
          accessToken,
        ).expect(404);
      },
    );
  });

  describe("Perform a batch of operations of flashcards", () => {
    it("should create the flashcards", async () => {
      const res = await flashcardsHelpers.batch(deckId, accessToken).expect(200);
      expect(res.body.data.created).toHaveLength(defaultFlashcardsData.length);
      for (let i = 0; i < defaultFlashcardsData.length; i++) {
        expect(res.body.data.created[i]).toHaveProperty("front", defaultFlashcardsData[i].front);
        expect(res.body.data.created[i]).toHaveProperty("back", defaultFlashcardsData[i].back);
      }
    });

    it("should update the flashcards", async () => {
      const batchCreateFlashcardsRes = await flashcardsHelpers
        .batch(deckId, accessToken)
        .expect(200);
      const createdFlashcards = (batchCreateFlashcardsRes.body.data as BatchFlashcardResponseDto)
        .created;

      const batchUpdateFlashcardsDto = {
        update: createdFlashcards.map(({ id }, idx) => ({
          id,
          ...newFlashcardsData[idx],
        })),
      } satisfies BatchFlashcardInput;
      const batchUpdateRes = await flashcardsHelpers
        .batch(deckId, accessToken, batchUpdateFlashcardsDto)
        .expect(200);
      expect(batchUpdateRes.body.data.updated).toHaveLength(newFlashcardsData.length);
      for (let i = 0; i < newFlashcardsData.length; i++) {
        expect(batchUpdateRes.body.data.updated[i]).toHaveProperty(
          "front",
          newFlashcardsData[i].front,
        );
        expect(batchUpdateRes.body.data.updated[i]).toHaveProperty(
          "back",
          newFlashcardsData[i].back,
        );
      }
    });

    it("should delete the flashcards", async () => {
      const batchCreateFlashcardsRes = await flashcardsHelpers
        .batch(deckId, accessToken)
        .expect(200);
      const createdFlashcards = (batchCreateFlashcardsRes.body.data as BatchFlashcardResponseDto)
        .created;

      const flashcardsToDeleteIds = createdFlashcards.map(({ id }) => id);

      const batchDeleteFlashcardsDto = {
        delete: flashcardsToDeleteIds,
      } satisfies BatchFlashcardInput;
      const batchDeleteRes = await flashcardsHelpers
        .batch(deckId, accessToken, batchDeleteFlashcardsDto)
        .expect(200);
      expect(batchDeleteRes.body.data.deleted).toHaveLength(flashcardsToDeleteIds.length);
      expect(batchDeleteRes.body.data.deleted).toEqual(flashcardsToDeleteIds);
    });

    it("should create, update and delete flashcards", async () => {
      const batchCreateFlashcardsRes = await flashcardsHelpers
        .batch(deckId, accessToken)
        .expect(200);
      const [flashcardToUpdate, flashcardToDelete] = (
        batchCreateFlashcardsRes.body.data as BatchFlashcardResponseDto
      ).created;

      const batchFlashcardsDto = {
        create: [
          {
            front: defaultFlashcardData.front,
            back: defaultFlashcardData.back,
          },
        ],
        update: [
          {
            id: flashcardToUpdate.id,
            front: newFlashcardData.newFront,
            back: newFlashcardData.newBack,
          },
        ],
        delete: [flashcardToDelete.id],
      } satisfies BatchFlashcardInput;
      const batchFlashcardsRes = await flashcardsHelpers
        .batch(deckId, accessToken, batchFlashcardsDto)
        .expect(200);

      expect(batchFlashcardsRes.body.data.created).toHaveLength(1);
      expect(batchFlashcardsRes.body.data.created[0]).toHaveProperty(
        "front",
        defaultFlashcardData.front,
      );
      expect(batchFlashcardsRes.body.data.created[0]).toHaveProperty(
        "back",
        defaultFlashcardData.back,
      );

      expect(batchFlashcardsRes.body.data.updated).toHaveLength(1);
      expect(batchFlashcardsRes.body.data.updated[0]).toHaveProperty(
        "front",
        newFlashcardData.newFront,
      );
      expect(batchFlashcardsRes.body.data.updated[0]).toHaveProperty(
        "back",
        newFlashcardData.newBack,
      );

      expect(batchFlashcardsRes.body.data.deleted).toHaveLength(1);
      expect(batchFlashcardsRes.body.data.deleted[0]).toEqual(flashcardToDelete.id);
    });
  });
});
