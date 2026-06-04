import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RagService } from "src/rag/rag.service";
import { LargeLanguageModelService } from "src/large-language-model/large-language-model.service";
import { SendChatMessageDto } from "src/chat-message/schemas";
import { ChatMessageResponseDto } from "src/chat-message/dto";
import { ChatMessage, ChatMessageRole } from "@prisma/client";
import {
  createAssistanceSystemPrompt,
  createChatTitleSystemPrompt,
  createMessageContext,
  createQueryContext,
} from "src/chat-message/constants";
import {
  createFlashcardQueryRewritePrompt,
  FLASHCARD_QUERY_REWRITE_PROMPT,
} from "src/flashcard/providers";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatNotFoundError } from "src/chat/errors";
import { FlashcardNotFoundError } from "src/flashcard/errors";
import { MAX_CHAT_TITLE_LENGTH, MIN_CHAT_TITLE_LENGTH } from "src/chat/schemas";
import { largeLanguageModelChatTitleSchema } from "src/large-language-model/schemas/large-language-model-chat-title.schema";

const HISTORY_CHAT_MESSAGES_LIMIT = 10;

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly largeLanguageModelService: LargeLanguageModelService,
    private readonly ragService: RagService,
    @Inject(FLASHCARD_QUERY_REWRITE_PROMPT)
    private readonly flashcardQueryRewritePrompt: typeof createFlashcardQueryRewritePrompt
  ) {}
  async send(
    chatId: number,
    { content, flashcardId }: SendChatMessageDto,
  ): Promise<ChatMessageResponseDto> {
    await this.prismaService.chatMessage.create({
      data: {
        content,
        role: ChatMessageRole.USER,
        chatId,
      },
    });

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

    const query = content;
    const rewrittenQuery = await this.largeLanguageModelService.invoke([
      new SystemMessage(this.flashcardQueryRewritePrompt(front, back)),
      new HumanMessage(createQueryContext(query)),
    ]);

    const context = await this.ragService.retrieve(rewrittenQuery, linkIds);

    const assistanceSystemPrompt = createAssistanceSystemPrompt(front, back, context);

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
      const chatTitleSystemPrompt = createChatTitleSystemPrompt(
        MIN_CHAT_TITLE_LENGTH,
        MAX_CHAT_TITLE_LENGTH,
        front,
        back,
      );

      const chatTitleMessages = [
        new SystemMessage(chatTitleSystemPrompt),
        new HumanMessage(createMessageContext(content)),
      ];

      const generatedChatTitle = largeLanguageModelChatTitleSchema.parse(
        await this.largeLanguageModelService.invoke(chatTitleMessages),
      );

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
