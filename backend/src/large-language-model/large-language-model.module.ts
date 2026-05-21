import { Module } from "@nestjs/common";
import { LargeLanguageModelService } from "./large-language-model.service";

@Module({
  providers: [LargeLanguageModelService],
  exports: [LargeLanguageModelService]
})
export class LargeLanguageModelModule {}
