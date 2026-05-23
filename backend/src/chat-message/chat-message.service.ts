import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RagService } from "src/rag/rag.service";
import { LargeLanguageModelService } from "src/large-language-model/large-language-model.service";
import { SendChatMessageDto } from "src/chat-message/schemas";
import { ChatMessageResponseDto } from "src/chat-message/dto";
import { ChatMessage, ChatMessageRole } from "@prisma/client";
import {
  createFlashcardContext,
  createSystemPromptWithContext,
  createSystemPromptWithoutContext,
} from "src/chat-message/constants";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";

const HISTORY_CHAT_MESSAGES_LIMIT = 10;

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly largeLanguageModelService: LargeLanguageModelService,
    private readonly ragService: RagService,
  ) {}
  async send(
    chatId: number,
    { flashcardFront, flashcardBack, deckId, content }: SendChatMessageDto,
  ): Promise<ChatMessageResponseDto> {
    await this.prismaService.chatMessage.create({
      data: {
        content,
        role: ChatMessageRole.USER,
        chatId,
      },
    });

    const links = await this.prismaService.deckEducationalResource.findMany({
      where: {
        deckId,
      },
      select: {
        educationalResourceId: true,
      },
    });
    const linkIds = links.map(({ educationalResourceId }) => educationalResourceId);

    const query = `${flashcardFront}\n${flashcardBack}\n${content}`;
    const { context, citations } = await this.ragService.retrieve(query, linkIds);

    const systemPrompt = context
      ? createSystemPromptWithContext(context)
      : createSystemPromptWithoutContext();

    const flashcardContext = createFlashcardContext(flashcardFront, flashcardBack);

    const history = (
      await this.prismaService.chatMessage.findMany({
        where: {
          chatId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: HISTORY_CHAT_MESSAGES_LIMIT,
      })
    ).reverse();

    const messages = [
      new SystemMessage(systemPrompt),
      new SystemMessage(flashcardContext),
      ...history.map((chatMessage) =>
        chatMessage.role === ChatMessageRole.USER
          ? new HumanMessage(chatMessage.content)
          : new AIMessage(chatMessage.content),
      ),
    ];

    const assistantResponse = await this.largeLanguageModelService.invoke(messages);

    const assistantChatMessage = await this.prismaService.chatMessage.create({
      data: {
        content: assistantResponse,
        role: ChatMessageRole.ASSISTANT,
        citations: citations.length ? citations : undefined,
        chatId,
      },
    });

    await this.prismaService.chat.update({
      where: {
        id: chatId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    return this.mapChatMessageToResponse(assistantChatMessage);
  }

  async findAll(chatId: number): Promise<ChatMessageResponseDto[]> {
    const chats = await this.prismaService.chatMessage.findMany({
      where: {
        chatId,
      },
    });
    return chats.map(this.mapChatMessageToResponse.bind(this));
  }

  private mapChatMessageToResponse(chatMessage: ChatMessage): ChatMessageResponseDto {
    return {
      ...chatMessage,
      citations: chatMessage.citations as ChatMessageResponseDto["citations"],
    };
  }
}
