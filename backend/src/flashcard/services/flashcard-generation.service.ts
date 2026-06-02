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
} from "src/flashcard/providers";
import { FlashcardGenerationError, FlashcardNotFoundError } from "src/flashcard/errors";
import { largeLanguageModelGeneratedFlashcardsSchema } from "src/large-language-model/schemas";
import { FLASHCARD_REGENERATION_PROMPT } from "src/flashcard/providers/flashcard-regeneration-prompt.provider";
import { largeLanguageModelGeneratedFlashcardSchema } from "src/large-language-model/schemas/large-language-model-generated-flashcard.schema";

@Injectable()
export class FlashcardGenerationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly ragService: RagService,
    private readonly largeLanguageModelService: LargeLanguageModelService,
    @Inject(FLASHCARD_GENERATION_PROMPT)
    private readonly flashcardGenerationPrompt: typeof createFlashcardGenerationPrompt,
    @Inject(FLASHCARD_REGENERATION_PROMPT)
    private readonly flashcardRegenerationPrompt: typeof createFlashcardRegenerationPrompt,
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

    const context = await this.ragService.retrieve(instruction, linkIds);

    const messages = [
      new SystemMessage(this.flashcardGenerationPrompt(count, context)),
      new HumanMessage(instruction),
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

    const query = [front, back, instruction].join("\n");

    const context = await this.ragService.retrieve(query, linkIds);

    const messages = [
      new SystemMessage(this.flashcardRegenerationPrompt(front, back, context)),
      new HumanMessage(instruction),
    ];

    console.log(messages);
    const serializedRegeneratedFlashcard = await this.largeLanguageModelService.invoke(messages);
    return this.deserializeRegeneratedFlashcard(serializedRegeneratedFlashcard);
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
