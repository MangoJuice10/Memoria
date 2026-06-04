import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RagService } from "src/rag/rag.service";
import { LargeLanguageModelService } from "src/large-language-model/large-language-model.service";
import { GenerateFlashcardDto, RegenerateFlashcardDto } from "src/flashcard/schemas";
import { GeneratedFlashcardResponseDto } from "src/flashcard/dto";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import {
  FLASHCARD_GENERATION_PROMPT,
  createFlashcardGenerationPrompt,
  createFlashcardRegenerationPrompt,
  FLASHCARD_SPLIT_PROMPT,
  createFlashcardSplitPrompt,
  FLASHCARD_QUERY_REWRITE_PROMPT,
  createFlashcardQueryRewritePrompt,
  Split,
} from "src/flashcard/providers";
import { FlashcardGenerationError, FlashcardNotFoundError } from "src/flashcard/errors";
import { largeLanguageModelGeneratedFlashcardsSchema } from "src/large-language-model/schemas";
import { FLASHCARD_REGENERATION_PROMPT } from "src/flashcard/providers/flashcard-regeneration-prompt.provider";
import { largeLanguageModelGeneratedFlashcardSchema } from "src/large-language-model/schemas/large-language-model-generated-flashcard.schema";
import { createInstructionContext, createQueryContext } from "src/chat-message/constants";
import { createQueryRewritePrompt, QUERY_REWRITE_PROMPT } from "src/common/providers";
import { SplitFlashcardDto } from "src/flashcard/schemas/split-flashcard.schema";
import {
  MAX_FLASHCARD_SPLIT_COUNT,
  MIN_FLASHCARD_SPLIT_COUNT,
} from "src/flashcard/constants/flashcard-generation.constants";

@Injectable()
export class FlashcardGenerationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly ragService: RagService,
    private readonly largeLanguageModelService: LargeLanguageModelService,
    @Inject(QUERY_REWRITE_PROMPT)
    private readonly queryRewritePrompt: typeof createQueryRewritePrompt,
    @Inject(FLASHCARD_QUERY_REWRITE_PROMPT)
    private readonly flashcardQueryRewritePrompt: typeof createFlashcardQueryRewritePrompt,
    @Inject(FLASHCARD_GENERATION_PROMPT)
    private readonly flashcardGenerationPrompt: typeof createFlashcardGenerationPrompt,
    @Inject(FLASHCARD_REGENERATION_PROMPT)
    private readonly flashcardRegenerationPrompt: typeof createFlashcardRegenerationPrompt,
    @Inject(FLASHCARD_SPLIT_PROMPT)
    private readonly flashcardSplitPrompt: typeof createFlashcardSplitPrompt,
  ) {}

  async generate(
    deckId: number,
    { instruction, count }: GenerateFlashcardDto,
  ): Promise<GeneratedFlashcardResponseDto[]> {
    const links = await this.prismaService.deckEducationalResource.findMany({
      where: {
        deckId,
      },
      select: {
        educationalResourceId: true,
      },
    });
    const linkIds = links.map(({ educationalResourceId }) => educationalResourceId);

    // TODO: Add linkIds 0 length check to terminate early when there are no attached educational resources

    const query = instruction;
    const rewrittenQuery = await this.largeLanguageModelService.invoke([
      new SystemMessage(this.queryRewritePrompt()),
      new HumanMessage(createQueryContext(query)),
    ]);

    const context = await this.ragService.retrieve(rewrittenQuery, linkIds);

    const messages = [
      new SystemMessage(this.flashcardGenerationPrompt(count, context)),
      new HumanMessage(createInstructionContext(instruction)),
    ];

    const serializedGeneratedFlashcards = await this.largeLanguageModelService.invoke(messages);

    return this.deserializeGeneratedFlashcards(serializedGeneratedFlashcards);
  }

  async regenerate(flashcardId: number, { instruction }: RegenerateFlashcardDto) {
    const flashcardWithEducationalResources = await this.prismaService.flashcard.findUnique({
      where: {
        id: flashcardId,
      },
      select: {
        front: true,
        back: true,
        deck: {
          select: {
            educationalResources: {
              select: {
                educationalResourceId: true,
              },
            },
          },
        },
      },
    });
    if (!flashcardWithEducationalResources) throw new FlashcardNotFoundError();

    const { front, back } = flashcardWithEducationalResources;

    const linkIds = flashcardWithEducationalResources.deck.educationalResources.map(
      ({ educationalResourceId }) => educationalResourceId,
    );

    const query = instruction;
    const rewrittenQuery = await this.largeLanguageModelService.invoke([
      new SystemMessage(this.flashcardQueryRewritePrompt(front, back)),
      new HumanMessage(createQueryContext(query)),
    ]);

    const context = await this.ragService.retrieve(rewrittenQuery, linkIds);

    const messages = [
      new SystemMessage(this.flashcardRegenerationPrompt(front, back, context)),
      new HumanMessage(createInstructionContext(instruction)),
    ];

    const serializedRegeneratedFlashcard = await this.largeLanguageModelService.invoke(messages);
    return this.deserializeRegeneratedFlashcard(serializedRegeneratedFlashcard);
  }

  async split(flashcardId: number, { instruction, count }: SplitFlashcardDto) {
    const flashcardWithEducationalResources = await this.prismaService.flashcard.findUnique({
      where: {
        id: flashcardId,
      },
      select: {
        front: true,
        back: true,
        deck: {
          select: {
            educationalResources: {
              select: {
                educationalResourceId: true,
              },
            },
          },
        },
      },
    });
    if (!flashcardWithEducationalResources) throw new FlashcardNotFoundError();

    const { front, back } = flashcardWithEducationalResources;

    const linkIds = flashcardWithEducationalResources.deck.educationalResources.map(
      ({ educationalResourceId }) => educationalResourceId,
    );

    const query = instruction;

    let context: string;

    if (query) {
      const rewrittenQuery = await this.largeLanguageModelService.invoke([
        new SystemMessage(this.flashcardQueryRewritePrompt(front, back)),
        new HumanMessage(createQueryContext(query ?? "")),
      ]);

      context = await this.ragService.retrieve(rewrittenQuery, linkIds);
    } else {
      context = await this.ragService.retrieve([front, back].join("\n"), linkIds);
    }

    const split: Split = count
      ? {
          mode: "manual",
          count,
        }
      : {
          mode: "auto",
          min: MIN_FLASHCARD_SPLIT_COUNT,
          max: MAX_FLASHCARD_SPLIT_COUNT,
        };

    const messages = [
      new SystemMessage(this.flashcardSplitPrompt(front, back, context, split)),
      new HumanMessage(createQueryContext(query ?? "")),
    ];

    const serializedSplitFlashcards = await this.largeLanguageModelService.invoke(messages);
    return this.deserializeGeneratedFlashcards(serializedSplitFlashcards);
  }

  private deserializeGeneratedFlashcards(
    serializedGeneratedFlashcards: string,
  ): GeneratedFlashcardResponseDto[] {
    try {
      const deserializedGeneratedFlashcards = JSON.parse(serializedGeneratedFlashcards);
      return largeLanguageModelGeneratedFlashcardsSchema.parse(deserializedGeneratedFlashcards);
    } catch {
      throw new FlashcardGenerationError();
    }
  }

  private deserializeRegeneratedFlashcard(
    serializedRegeneratedFlashcard: string,
  ): GeneratedFlashcardResponseDto {
    try {
      const deserializedRegeneratedFlashcard = JSON.parse(serializedRegeneratedFlashcard);
      return largeLanguageModelGeneratedFlashcardSchema.parse(deserializedRegeneratedFlashcard);
    } catch {
      throw new FlashcardGenerationError();
    }
  }
}
