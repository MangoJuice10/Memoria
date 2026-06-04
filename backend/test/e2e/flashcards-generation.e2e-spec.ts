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
  FLASHCARD_QUERY_REWRITE_PROMPT,
  FLASHCARD_REGENERATION_PROMPT,
} from "src/flashcard/providers";
import { createAuthFixtures } from "test/fixtures/auth/auth.fixture";
import { createDecksFixtures } from "test/fixtures/decks/decks.fixture";
import { createFlashcardsFixtures } from "test/fixtures/flashcards/flashcards.fixture";
import { defaultEducationalResourcesData } from "test/fixtures/educational-resources/educational-resources.data";
import { createEducationalResourcesFixtures } from "test/fixtures/educational-resources/educational-resources.fixture";
import { createEducationalResourcesHelpers } from "test/helpers/educational-resources/educational-resources.helper";
import { createFlashcardsGenerationPromptMock } from "test/mocks/flashcards-generation-prompt.mock";
import { createFlashcardRegenerationPromptMock } from "test/mocks/flashcard-regeneration-prompt.mock";
import { createFlashcardSplitPromptMock } from "test/mocks/flashcard-split-prompt.mock";
import { FLASHCARD_SPLIT_PROMPT } from "src/flashcard/providers/flashcard-split-prompt.provider";
import { QUERY_REWRITE_PROMPT } from "src/common/providers";
import { createQueryRewritePromptMock } from "test/mocks/query-rewrite-prompt.mock";
import { createFlashcardQueryRewritePromptMock } from "test/mocks/flashcard-query-rewrite-prompt.mock";
import { GeneratedFlashcardResponseDto } from "src/flashcard/dto";

describe("Flashcards generation", () => {
  let testingApp: TestingApp;
  let authHelpers: ReturnType<typeof createAuthHelpers>;
  let decksHelpers: ReturnType<typeof createDecksHelpers>;
  let flashcardsHelpers: ReturnType<typeof createFlashcardsHelpers>;
  let educationalResourcesHelpers: ReturnType<typeof createEducationalResourcesHelpers>;

  const { username, email, password, otherEmail } = defaultAuthData;
  const { name, description, isPublic } = defaultDecksData;
  const { front, back } = defaultFlashcardData;
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
        .useValue(createFlashcardRegenerationPromptMock)
        .overrideProvider(FLASHCARD_SPLIT_PROMPT)
        .useValue(createFlashcardSplitPromptMock)
        .overrideProvider(QUERY_REWRITE_PROMPT)
        .useValue(createQueryRewritePromptMock)
        .overrideProvider(FLASHCARD_QUERY_REWRITE_PROMPT)
        .useValue(createFlashcardQueryRewritePromptMock),
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
      }, 30000);
    });

    describe("when the deck has an attached educational resource", () => {
      beforeAll(async () => {
        await educationalResourcesHelpers
          .attachToDeck(deckId, educationalResourceId, accessToken)
          .expect(200);
      });

      afterAll(async () => {
        await educationalResourcesHelpers
          .detachFromDeck(deckId, educationalResourceId, accessToken)
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
          expect(res.body.data[0]).toHaveProperty("front", "GENERATED_FRONT_1");
          expect(res.body.data[0]).toHaveProperty("back", "GENERATED_BACK_1");

          const persistedFlashcards = await testingApp.prismaService.flashcard.findMany({
            where: {
              deckId,
            },
          });

          expect(persistedFlashcards).toHaveLength(0);
        },
        30000,
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
          res.body.data.forEach(
            (generatedFlashcard: GeneratedFlashcardResponseDto, idx: number) => {
              expect(generatedFlashcard).toEqual({
                front: `GENERATED_FRONT_${idx + 1}`,
                back: `GENERATED_BACK_${idx + 1}`,
              });
            },
          );

          const persistedFlashcards = await testingApp.prismaService.flashcard.findMany({
            where: {
              deckId,
            },
          });

          expect(persistedFlashcards).toHaveLength(0);
        },
        30000,
      );

      it("should return an empty array when the instruction doesn't match the content of the educational resource", async () => {
        const res = await flashcardsHelpers
          .generate(deckId, accessToken, {
            instruction: generationData.unrelatedInstruction,
            count: 1,
          })
          .expect(200);

        expect(res.body.data).toHaveLength(0);
      }, 30000);
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
        30000,
      );
    });

    describe("when the deck has an attached educational resource", () => {
      beforeAll(async () => {
        await educationalResourcesHelpers
          .attachToDeck(deckId, educationalResourceId, accessToken)
          .expect(200);
      });

      afterAll(async () => {
        await educationalResourcesHelpers
          .detachFromDeck(deckId, educationalResourceId, accessToken)
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
        30000,
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
        30000,
      );
    });
  });

  describe("Split the flashcard", () => {
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
      itShouldSplitFlashcard("ORIGINAL_SPLIT_FRONT", "ORIGINAL_SPLIT_BACK");
    });

    describe("when the deck has an attached educational resource", () => {
      beforeAll(async () => {
        await educationalResourcesHelpers
          .attachToDeck(deckId, educationalResourceId, accessToken)
          .expect(200);
      });

      afterAll(async () => {
        await educationalResourcesHelpers
          .detachFromDeck(deckId, educationalResourceId, accessToken)
          .expect(200);
      });

      itShouldSplitFlashcard("SPLIT_FRONT", "SPLIT_BACK");
    });
  });

  function itShouldSplitFlashcard(frontPrefix: string, backPrefix: string) {
    describe("when the count of the flashcards to split the original flashcard into is not provided", () => {
      it(
        "should return an array that contains at least 2 flashcards, without persisting the flashcards to the database and" +
          " without modifying or deleting the original flashcard",
        async () => {
          const res = await flashcardsHelpers
            .split(deckId, flashcardId, accessToken, {})
            .expect(200);
          expect(res.body.data.length).toEqual(2);
          res.body.data.forEach((splitFlashcard: GeneratedFlashcardResponseDto, idx: number) => {
            expect(splitFlashcard).toEqual({
              front: `${frontPrefix}_${idx + 1}`,
              back: `${backPrefix}_${idx + 1}`,
            });
          });

          await assertNoChangesWerePersisted();
        },
        30000,
      );
    });

    describe("when the count of the flashcards to split the original flashcard into is provided", () => {
      it(
        "should return an array that contains the provided number of flashcards, without persisting the flashcards to the database and" +
          " without modifying or deleting the original flashcard",
        async () => {
          const count = 5;

          const res = await flashcardsHelpers
            .split(deckId, flashcardId, accessToken, {
              count,
            })
            .expect(200);
          expect(res.body.data.length).toEqual(count);
          res.body.data.forEach((splitFlashcard: GeneratedFlashcardResponseDto, idx: number) => {
            expect(splitFlashcard).toEqual({
              front: `${frontPrefix}_${idx + 1}`,
              back: `${backPrefix}_${idx + 1}`,
            });
          });

          await assertNoChangesWerePersisted();
        },
        30000,
      );
    });
  }

  async function assertNoChangesWerePersisted() {
    const persistedFlashcard = await testingApp.prismaService.flashcard.findUnique({
      where: {
        id: flashcardId,
      },
    });
    expect(persistedFlashcard).toBeDefined();
    expect(persistedFlashcard).toHaveProperty("front", defaultFlashcardData.front);
    expect(persistedFlashcard).toHaveProperty("back", defaultFlashcardData.back);

    const persistedFlashcards = await testingApp.prismaService.flashcard.findMany({
      where: {
        deckId,
      },
    });
    expect(persistedFlashcards).toHaveLength(1);
  }
});
