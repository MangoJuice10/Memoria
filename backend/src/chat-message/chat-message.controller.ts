import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ChatMessageService } from "src/chat-message/chat-message.service";
import { SendChatMessageDto, sendChatMessageSchema } from "src/chat-message/schemas";
import { ZodValidationPipe } from "src/common";

@Controller("chats/:chatId/messages")
export class ChatMessageController {
  constructor(private readonly chatMessageService: ChatMessageService) {}

  @Post()
  @HttpCode(201)
  async send(
    @Param("chatId", ParseIntPipe) chatId: number,
    @Body(new ZodValidationPipe(sendChatMessageSchema)) sendChatMessageDto: SendChatMessageDto,
  ) {
    return this.chatMessageService.send(chatId, sendChatMessageDto);
  }

  @Get()
  @HttpCode(200)
  async findAll(@Param("chatId", ParseIntPipe) chatId: number) {
    return this.chatMessageService.findAll(chatId);
  }
}
