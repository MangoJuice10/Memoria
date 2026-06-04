import { Injectable, OnModuleInit } from "@nestjs/common";
import { LLM } from "@langchain/core/language_models/llms";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";

import { ChatOpenAI } from "@langchain/openai";
import { HuggingFaceInference } from "@langchain/community/llms/hf";

import { ChatGroq } from "@langchain/groq";
import { ChatOllama } from "@langchain/ollama";

import { BaseMessage } from "@langchain/core/messages";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class LargeLanguageModelService implements OnModuleInit {
  private largeLanguageModel: BaseChatModel;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const groqApiKey = this.configService.get("GROQ_API_KEY");
    const groqModel = this.configService.get("GROQ_LLM");
    this.largeLanguageModel = new ChatGroq({
      apiKey: groqApiKey,
      model: groqModel,
      temperature: 0,
    });

    /*
    const ollamaApiKey = this.configService.get("OLLAMA_API_KEY");
    const ollamaModel = this.configService.get("OLLAMA_LLM");
    const ollamaBaseUrl = "https://ollama.com/v1";

    this.largeLanguageModel = new ChatOpenAI({
      apiKey: ollamaApiKey,
      model: ollamaModel,
      temperature: 0,
      configuration: {
        baseURL: ollamaBaseUrl,
      },
    });
    */

    /*
    const openRouterApiKey = this.configService.get("OPENROUTER_API_KEY");
    const openRouterModel = this.configService.get("OPENROUTER_LLM");
    const openRouterBaseUrl = this.configService.get("OPENROUTER_URL");

    this.largeLanguageModel = new ChatOpenAI({
      apiKey: openRouterApiKey,
      model: openRouterModel,
      temperature: 0,
      configuration: {
        baseURL: openRouterBaseUrl,
      },
    });
    */

    /*
    const huggingFaceApiKey = this.configService.get("HUGGINGFACE_API_KEY");
    const huggingFaceModel = this.configService.get("HUGGINGFACE_LLM");
    const huggingFaceBaseUrl = this.configService.get("HUGGINGFACE_URL");

    this.largeLanguageModel = new ChatOpenAI({
      apiKey: huggingFaceApiKey,
      model: huggingFaceModel,
      temperature: 0,
      configuration: {
        baseURL: huggingFaceBaseUrl,
      },
    });
    */
  }

  async invoke(messages: BaseMessage[]): Promise<string> {
    const response = await this.largeLanguageModel.invoke(messages);
    return response.content as string;
  }
}
