import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RagService } from "src/rag/rag.service";
import { LargeLanguageModelService } from "src/large-language-model/large-language-model.service";
import { SendChatMessageDto } from "src/chat-message/schemas";
import { ChatMessageResponseDto } from "src/chat-message/dto";
import { ChatMessage, ChatMessageRole } from "@prisma/client";
import {
  createFlashcardContext,
  createAssistanceSystemPromptWithContext,
  createAssistanceSystemPromptWithoutContext,
  createChatTitleSystemPrompt,
  createQueryRewriteSystemPrompt,
} from "src/chat-message/constants";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatNotFoundError } from "src/chat/errors";

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

    const flashcardContext = createFlashcardContext(flashcardFront, flashcardBack);

    const rewrittenQuery = await this.largeLanguageModelService.invoke([
      new SystemMessage(createQueryRewriteSystemPrompt()),
      new SystemMessage(flashcardContext),
      new HumanMessage(content),
    ]);

    const linkIds = links.map(({ educationalResourceId }) => educationalResourceId);
    const context = await this.ragService.retrieve(rewrittenQuery, linkIds);

    const assistanceSystemPrompt = context
      ? createAssistanceSystemPromptWithContext(context)
      : createAssistanceSystemPromptWithoutContext();
    
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

    const isFirstChatMessage = history.length === 1;

    const assistanceMessages = [
      new SystemMessage(assistanceSystemPrompt),
      new SystemMessage(flashcardContext),
      ...history.map((chatMessage) =>
        chatMessage.role === ChatMessageRole.USER
          ? new HumanMessage(chatMessage.content)
          : new AIMessage(chatMessage.content),
      ),
    ];

    const largeLanguageModelResponse =
      await this.largeLanguageModelService.invoke(assistanceMessages);

    const assistantChatMessage = await this.prismaService.chatMessage.create({
      data: {
        content: largeLanguageModelResponse,
        role: ChatMessageRole.ASSISTANT,
        chatId,
      },
    });

    const chat = await this.prismaService.chat.findUnique({
      where: {
        id: chatId,
      },
    });
    if (!chat) throw new ChatNotFoundError();

    if (isFirstChatMessage && !chat.title) {
      const chatTitleSystemPrompt = createChatTitleSystemPrompt();

      const chatTitleMessages = [
        new SystemMessage(chatTitleSystemPrompt),
        new SystemMessage(flashcardContext),
        new HumanMessage(content),
      ];

      const generatedChatTitle = (await this.largeLanguageModelService.invoke(chatTitleMessages))
        .trim()
        .slice(0, 100);

      await this.prismaService.chat.update({
        where: {
          id: chatId,
        },
        data: {
          title: generatedChatTitle,
        },
      });
    }

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
      orderBy: {
        createdAt: "asc",
      },
    });
    return chats.map(this.mapChatMessageToResponse.bind(this));
  }

  private mapChatMessageToResponse(chatMessage: ChatMessage): ChatMessageResponseDto {
    return {
      ...chatMessage,
    };
  }
}
