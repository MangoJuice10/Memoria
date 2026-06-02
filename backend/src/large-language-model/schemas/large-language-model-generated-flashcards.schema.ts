import { z } from "zod";
import { largeLanguageModelGeneratedFlashcardSchema } from "./large-language-model-generated-flashcard.schema";

export const largeLanguageModelGeneratedFlashcardsSchema = z.array(
  largeLanguageModelGeneratedFlashcardSchema,
);
