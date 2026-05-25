import { Injectable, OnModuleInit } from "@nestjs/common";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import {ChatGroq} from "@langchain/groq";
import { ConfigService } from "@nestjs/config";
import { BaseMessage } from "@langchain/core/messages";

@Injectable()
export class LargeLanguageModelService implements OnModuleInit {
  private largeLanguageModel: BaseChatModel;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const apiKey = this.configService.get("GROQ_API_KEY");
    this.largeLanguageModel = new ChatGroq({
      model: this.configService.get("GROQ_LLM"),
      apiKey,
      temperature: 0,
    });
  }

  async invoke(messages: BaseMessage[]): Promise<string> {
    const response = await this.largeLanguageModel.invoke(messages);
    return response.content as string;
  }
}
