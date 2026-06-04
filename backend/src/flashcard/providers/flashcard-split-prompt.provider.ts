import {
  createEducationalResourcesContext,
  createFlashcardAntiMetadataGuidelinesContext,
  createFlashcardContext,
  createFlashcardCoverageGuidelinesContext,
  createFlashcardQualityGuidelinesContext,
  createFlashcardsResponseFormatContext,
  createFlashcardStyleGuidelinesContext,
} from "src/chat-message/constants";

export type Split =
  | {
      mode: "manual";
      count: number;
    }
  | {
      mode: "auto";
      min: number;
      max: number;
    };

export const FLASHCARD_SPLIT_PROMPT = Symbol("FLASHCARD_SPLIT_PROMPT");

export function createFlashcardSplitPrompt(
  front: string,
  back: string,
  context: string,
  split: Split,
) {
  return [
    "You are a flashcard splitting assistant for the Memoria learning platform.",
    "Your task is to split a single flashcard into multiple smaller, atomic flashcards.",
    "",
    createFlashcardQualityGuidelinesContext(),
    createFlashcardStyleGuidelinesContext(),
    createFlashcardCoverageGuidelinesContext(),
    createFlashcardAntiMetadataGuidelinesContext(),
    "",
    "GUIDELINES:",
    split.mode === "manual"
      ? `1. Split the flashcard into exactly ${split.count} flashcards.`
      : `1. Split the flashcard into AT LEAST ${split.min} atomic flashcards, AT MOST ${split.max} atomic flashcards, 
         based on how many atomic flashcards the content naturally supports.`,
    "2. Each resulting flashcard must cover a distinct, self-contained idea from the original.",
    "3. Base the content on the original flashcard and the SOURCES section below. Do not use outside knowledge.",
    "4. Respond in the same language the original flashcard is written in.",
    "",
    createFlashcardsResponseFormatContext(),
    createFlashcardContext(front, back),
    createEducationalResourcesContext(context),
  ].join("\n");
}
