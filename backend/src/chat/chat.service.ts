import { Injectable } from "@nestjs/common";
import { LargeLanguageModelService } from "src/large-language-model/large-language-model.service";
import { RagService } from "src/rag/rag.service";
import { PrismaService } from "src/prisma/prisma.service";
import {
  createSystemPromptWithContext,
  createSystemPromptWithoutContext,
} from "src/chat/constants";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

@Injectable()
export class ChatService {
  constructor(
    private readonly largeLanguageModelService: LargeLanguageModelService,
    private readonly ragService: RagService,
    private readonly prismaService: PrismaService,
  ) {}

  async chat(deckId: number, message: string): Promise<string> {
    const educationalResourceIds = await this.getLinks(deckId);
    const context = await this.ragService.retrieve(message, educationalResourceIds);

    return this.largeLanguageModelService.invoke([
      new SystemMessage(this.buildSystemPrompt(context)),
      new HumanMessage(message),
    ]);
  }

  private async getLinks(deckId: number): Promise<number[]> {
    const links = await this.prismaService.deckEducationalResource.findMany({
      where: {
        deckId,
      },
      select: {
        educationalResourceId: true,
      },
    });

    return links.map(({ educationalResourceId }) => educationalResourceId);
  }

  private buildSystemPrompt(context: string): string {
    if (!context) {
      return createSystemPromptWithoutContext();
    }

    return createSystemPromptWithContext(context);
  }
}
