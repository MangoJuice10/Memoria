import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RagService } from "src/rag/rag.service";
import { LargeLanguageModelService } from "src/large-language-model/large-language-model.service";
import { GenerateFlashcardDto } from "src/flashcard/schemas";
import { GeneratedFlashcardResponseDto } from "src/flashcard/dto";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import {
  FLASHCARD_GENERATION_PROMPT,
  createFlashcardGenerationPrompt,
} from "src/flashcard/providers";
import { FlashcardGenerationFailedError } from "src/flashcard/errors";
import { largeLanguageModelGeneratedFlashcardsSchema } from "src/large-language-model/schemas";

@Injectable()
export class FlashcardGenerationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly ragService: RagService,
    private readonly largeLanguageModelService: LargeLanguageModelService,
    @Inject(FLASHCARD_GENERATION_PROMPT)
    private readonly flashcardGenerationPrompt: typeof createFlashcardGenerationPrompt,
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
      new SystemMessage(this.flashcardGenerationPrompt(context, count)),
      new HumanMessage(instruction),
    ];

    const serializedGeneratedFlashcards = await this.largeLanguageModelService.invoke(messages);
    return this.deserializeGeneratedFlashcards(serializedGeneratedFlashcards);
  }

  private deserializeGeneratedFlashcards(
    serializedGeneratedFlashcards: string,
  ): GeneratedFlashcardResponseDto[] {
    try {
      const deserializedGeneratedFlashcards = JSON.parse(serializedGeneratedFlashcards);
      return largeLanguageModelGeneratedFlashcardsSchema.parse(deserializedGeneratedFlashcards);
    } catch {
      throw new FlashcardGenerationFailedError();
    }
  }
}
