import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ChatService } from "src/chat/chat.service";
import { CreateChatDto, createChatSchema, UpdateChatDto, updateChatSchema } from "./schemas";
import { User } from "src/auth/decorators";
import { ZodValidationPipe } from "src/common";

@Controller("chats")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @HttpCode(201)
  async create(
    @User("id") userId: number,
    @Body(new ZodValidationPipe(createChatSchema)) createChatDto: CreateChatDto,
  ) {
    return this.chatService.create(userId, createChatDto);
  }

  @Get()
  @HttpCode(200)
  async findAll(@User("id") userId: number) {
    return this.chatService.findAll(userId);
  }

  @Get(":chatId")
  @HttpCode(200)
  async findOne(@Param("chatId", ParseIntPipe) chatId: number) {
    return this.chatService.findOne(chatId);
  }

  @Patch(":chatId")
  @HttpCode(200)
  async update(
    @Param("deckId", ParseIntPipe) chatId: number,
    @Body(new ZodValidationPipe(updateChatSchema)) updateChatDto: UpdateChatDto,
  ) {
    return this.chatService.update(chatId, updateChatDto);
  }

  @Delete(":chatId")
  @HttpCode(204)
  async delete(@Param("chatId", ParseIntPipe) chatId: number) {
    return this.chatService.delete(chatId);
  }
}
