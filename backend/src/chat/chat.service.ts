import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateChatDto, UpdateChatDto } from "src/chat/schemas";
import { ChatResponseDto } from "src/chat/dto";
import { Chat } from "@prisma/client";
import { ChatNotFoundError } from "src/chat/errors";
import { isPrismaNotFoundError } from "src/prisma/prisma.errors";

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(userId: number, createChatDto: CreateChatDto): Promise<ChatResponseDto> {
    const chat = await this.prismaService.chat.create({
      data: {
        ...createChatDto,
        userId,
      },
    });

    return this.mapToResponse(chat);
  }

  async findAll(userId: number): Promise<ChatResponseDto[]> {
    const chats = await this.prismaService.chat.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return chats.map(this.mapToResponse.bind(this));
  }

  async findOne(chatId: number): Promise<ChatResponseDto> {
    return this.getChatOrThrow(chatId);
  }

  async update(chatId: number, updateChatDto: UpdateChatDto): Promise<ChatResponseDto> {
    try {
      return this.prismaService.chat.update({
        where: {
          id: chatId,
        },
        data: updateChatDto,
      });
    } catch (err) {
      if (isPrismaNotFoundError(err)) throw new ChatNotFoundError();
      throw err;
    }
  }

  async delete(chatId: number) {
    try {
      return this.prismaService.chat.delete({
        where: {
          id: chatId,
        },
      });
    } catch (err) {
      if (isPrismaNotFoundError(err)) throw new ChatNotFoundError();
      throw err;
    }
  }

  private async assertOwnership(userId: number, chatId: number) {
    const chat = this.prismaService.chat.findFirst({
      where: {
        id: chatId,
        userId,
      },
    });
    if (!chat) throw new ChatNotFoundError();
  }

  private async getChatOrThrow(chatId: number): Promise<ChatResponseDto> {
    const chat = await this.prismaService.chat.findUnique({
      where: {
        id: chatId,
      },
    });
    if (!chat) throw new ChatNotFoundError();

    return chat;
  }

  private mapToResponse(chat: Chat): ChatResponseDto {
    return chat;
  }
}
