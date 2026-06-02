import request from "supertest";
import { createTestingApp, TestingApp } from "test/setup/create-testing-app";
import { createAuthHelpers } from "test/helpers/auth/auth.helper";
import { createDecksHelpers } from "test/helpers/decks/decks.helper";
import { createFlashcardsHelpers } from "test/helpers/flashcards/flashcards.helper";
import { defaultAuthData } from "test/fixtures/auth/auth.data";
import { defaultDecksData } from "test/fixtures/decks/decks.data";
import {
  defaultFlashcardsData,
  defaultFlashcardData,
  generationData,
  newFlashcardData,
} from "test/fixtures/flashcards/flashcards.data";
import {
  FLASHCARD_GENERATION_PROMPT,
  FLASHCARD_REGENERATION_PROMPT,
} from "src/flashcard/providers";
import { createAuthFixtures } from "test/fixtures/auth/auth.fixture";
import { createDecksFixtures } from "test/fixtures/decks/decks.fixture";
import { createFlashcardsFixtures } from "test/fixtures/flashcards/flashcards.fixture";
import { defaultEducationalResourcesData } from "test/fixtures/educational-resources/educational-resources.data";
import { createEducationalResourcesFixtures } from "test/fixtures/educational-resources/educational-resources.fixture";
import { createEducationalResourcesHelpers } from "test/helpers/educational-resources/educational-resources.helper";
import { createFlashcardsGenerationPromptMock } from "test/mocks/create-flashcards-generation-prompt.mock";
import { createFlashcardsRegenerationPromptMock } from "test/mocks/create-flashcards-regeneration-prompt.mock";
import { setAccessToken } from "test/helpers/setAccessToken.helper";

describe("Flashcards generation", () => {
  let testingApp: TestingApp;
  let authHelpers: ReturnType<typeof createAuthHelpers>;
  let decksHelpers: ReturnType<typeof createDecksHelpers>;
  let flashcardsHelpers: ReturnType<typeof createFlashcardsHelpers>;
  let educationalResourcesHelpers: ReturnType<typeof createEducationalResourcesHelpers>;

  const { username, email, password, otherEmail } = defaultAuthData;
  const { name, description, isPublic } = defaultDecksData;
  const { front, back } = defaultFlashcardData;
  const { newFront, newBack } = newFlashcardData;
  const {
    name: educationalResourceName,
    description: educationalResourceDescription,
    filename: educationalResourceFilename,
    fileContent: educationalResourceFileContent,
  } = defaultEducationalResourcesData;

  let accessToken: string;
  let otherAccessToken: string;
  let deckId: number;
  let educationalResourceId: number;
  let flashcardId: number;

  const { createLoginDto, createRegisterDto } = createAuthFixtures(username, email, password);
  const { createCreateDeckDto } = createDecksFixtures(name, description, isPublic);
  const { createCreateFlashcardDto, createBatchFlashcardDto } = createFlashcardsFixtures(
    { front, back },
    defaultFlashcardsData,
  );
  const { createCreateEducationalResourceDto } = createEducationalResourcesFixtures(
    name,
    description,
  );

  beforeAll(async () => {
    testingApp = await createTestingApp((testingAppBuilder) =>
      testingAppBuilder
        .overrideProvider(FLASHCARD_GENERATION_PROMPT)
        .useValue(createFlashcardsGenerationPromptMock)
        .overrideProvider(FLASHCARD_REGENERATION_PROMPT)
        .useValue(createFlashcardsRegenerationPromptMock),
    );
    await testingApp.prismaService.cleanDatabase();
    await testingApp.vectorStoreService.cleanCollection();

    authHelpers = createAuthHelpers(testingApp.httpServer, createRegisterDto, createLoginDto);
    decksHelpers = createDecksHelpers(testingApp.httpServer, createCreateDeckDto);
    flashcardsHelpers = createFlashcardsHelpers(
      testingApp.httpServer,
      createCreateFlashcardDto,
      createBatchFlashcardDto,
    );
    educationalResourcesHelpers = createEducationalResourcesHelpers(
      testingApp.httpServer,
      createCreateEducationalResourceDto,
    );

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

    ({
      body: {
        data: { id: educationalResourceId },
      },
    } = await educationalResourcesHelpers
      .create(accessToken, educationalResourceFileContent, educationalResourceFilename)
      .expect(201));
  }, 30000);

  afterAll(async () => {
    await testingApp.prismaService.cleanDatabase();
    await testingApp.vectorStoreService.cleanCollection();
    await testingApp.storageService.cleanBucket();
    await testingApp.app.close();
  });

  describe("Generate flashcards", () => {
    describe("when the deck has no attached educational resources", () => {
      it("should return an empty array", async () => {
        const res = await flashcardsHelpers
          .generate(deckId, accessToken, {
            instruction: generationData.instruction,
            count: 1,
          })
          .expect(200);
        expect(res.body.data).toEqual([]);
      });
    });

    describe("when the deck has an attached educational resource", () => {
      beforeAll(async () => {
        await educationalResourcesHelpers
          .attachToDeck(deckId, educationalResourceId, accessToken)
          .expect(200);
      });

      it(
        "should return exactly one generated flashcard when the instruction matches the content of the educational resource," +
          " without persisting the flashcard to the database",
        async () => {
          const res = await flashcardsHelpers
            .generate(deckId, accessToken, {
              instruction: generationData.instruction,
              count: 1,
            })
            .expect(200);

          expect(res.body.data).toHaveLength(1);
          expect(res.body.data[0]).toHaveProperty("front", "TEST_FRONT_1");
          expect(res.body.data[0]).toHaveProperty("back", "TEST_BACK_1");

          const persistedFlashcards = await testingApp.prismaService.flashcard.findMany({
            where: {
              deckId,
            },
          });

          expect(persistedFlashcards).toHaveLength(0);
        },
      );

      it(
        "should return the provided number of flashcards when the instruction matches the content of the educational resource," +
          " without persisting the flashcard to the database",
        async () => {
          const res = await flashcardsHelpers
            .generate(deckId, accessToken, {
              instruction: generationData.instruction,
              count: 5,
            })
            .expect(200);

          expect(res.body.data).toHaveLength(5);

          const persistedFlashcards = await testingApp.prismaService.flashcard.findMany({
            where: {
              deckId,
            },
          });

          expect(persistedFlashcards).toHaveLength(0);
        },
      );

      it("should return an empty array when the instruction doesn't match the content of the educational resource", async () => {
        const res = await flashcardsHelpers
          .generate(deckId, accessToken, {
            instruction: generationData.unrelatedInstruction,
            count: 1,
          })
          .expect(200);

        expect(res.body.data).toHaveLength(0);
      });

      afterAll(async () => {
        await educationalResourcesHelpers
          .detachFromDeck(deckId, educationalResourceId, accessToken)
          .expect(200);
      });
    });
  });

  describe("Regenerate the flashcard", () => {
    beforeEach(async () => {
      const res = await flashcardsHelpers.create(deckId, accessToken);
      flashcardId = res.body.data.id;
    });

    afterEach(async () => {
      await testingApp.prismaService.flashcard.delete({
        where: {
          id: flashcardId,
        },
      });
    });

    describe("when the deck has no attached educational resources", () => {
      it(
        "should regenerate the flashcard based on the flashcard's content when the instruction doesn't match the content of the" +
          " educational resource, without persisting the changes to the database",
        async () => {
          const res = await flashcardsHelpers
            .regenerate(deckId, flashcardId, accessToken, {
              instruction: generationData.instruction,
            })
            .expect(200);
          expect(res.body.data).toHaveProperty("front", "ORIGINAL_FRONT");
          expect(res.body.data).toHaveProperty("back", "ORIGINAL_BACK");

          const persistedFlashcard = await testingApp.prismaService.flashcard.findUnique({
            where: {
              id: flashcardId,
            },
          });
          expect(persistedFlashcard).toHaveProperty("front", defaultFlashcardData.front);
          expect(persistedFlashcard).toHaveProperty("back", defaultFlashcardData.back);
        },
      );
    });

    describe("when the deck has an attached educational resource", () => {
      beforeAll(async () => {
        await educationalResourcesHelpers
          .attachToDeck(deckId, educationalResourceId, accessToken)
          .expect(200);
      });

      it(
        "should regenerate the flashcard based on the educational resources when the instruction matches the content of the" +
          " educational resource, without persisting the changes to the database",
        async () => {
          const res = await flashcardsHelpers
            .regenerate(deckId, flashcardId, accessToken, {
              instruction: generationData.instruction,
            })
            .expect(200);
          expect(res.body.data).toHaveProperty("front", "REGENERATED_FRONT");
          expect(res.body.data).toHaveProperty("back", "REGENERATED_BACK");

          const persistedFlashcard = await testingApp.prismaService.flashcard.findUnique({
            where: {
              id: flashcardId,
            },
          });
          expect(persistedFlashcard).toHaveProperty("front", defaultFlashcardData.front);
          expect(persistedFlashcard).toHaveProperty("back", defaultFlashcardData.back);
        },
      );

      it(
        "should regenerate the flashcard based on the flashcard's content when the instruction doesn't match the content of the" +
          " educational resource, without persisting the changes to the database",
        async () => {
          const res = await flashcardsHelpers
            .regenerate(deckId, flashcardId, accessToken, {
              instruction: generationData.unrelatedInstruction,
            })
            .expect(200);
          expect(res.body.data).toHaveProperty("front", "ORIGINAL_FRONT");
          expect(res.body.data).toHaveProperty("back", "ORIGINAL_BACK");

          const persistedFlashcard = await testingApp.prismaService.flashcard.findUnique({
            where: {
              id: flashcardId,
            },
          });
          expect(persistedFlashcard).toHaveProperty("front", defaultFlashcardData.front);
          expect(persistedFlashcard).toHaveProperty("back", defaultFlashcardData.back);
        },
      );

      afterAll(async () => {
        await educationalResourcesHelpers
          .detachFromDeck(deckId, educationalResourceId, accessToken)
          .expect(200);
      });
    });
  });
});
