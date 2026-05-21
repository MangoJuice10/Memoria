import { Injectable } from "@nestjs/common";
import { ChatOpenAI } from "@langchain/openai";
import { ConfigService } from "@nestjs/config";
import { BaseMessage } from "@langchain/core/messages";

@Injectable()
export class LargeLanguageModelService {
  private largeLanguageModel: ChatOpenAI;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const apiKey = this.configService.get("OPENROUTER_API_KEY");
    this.largeLanguageModel = new ChatOpenAI({
      model: this.configService.get("OPENROUTER_LLM"),
      apiKey,
      configuration: {
        baseURL: "https://openrouter.ai/api/v1",
      },
      temperature: 0,
    });
  }

  async invoke(messages: BaseMessage[]): Promise<string> {
    const response = await this.largeLanguageModel.invoke(messages);
    return response.content as string;
  }
}
