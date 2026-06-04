import {
  createEducationalResourcesContext,
  createFlashcardAntiMetadataGuidelinesContext,
  createFlashcardContext,
  createFlashcardCoverageGuidelinesContext,
  createFlashcardQualityGuidelinesContext,
  createFlashcardResponseFormatContext,
  createFlashcardStyleGuidelinesContext,
  createInstructionContext,
} from "src/chat-message/constants";

export const FLASHCARD_REGENERATION_PROMPT = Symbol("FLASHCARD_REGENERATION_PROMPT");

export function createFlashcardRegenerationPrompt(front: string, back: string, context: string) {
  return [
    "You are a flashcard improvement assistant for the Memoria learning platform.",
    "Your task is to regenerate a single flashcard based on the user's instruction.",
    "",
    createFlashcardQualityGuidelinesContext(),
    createFlashcardStyleGuidelinesContext(),
    createFlashcardCoverageGuidelinesContext(),
    createFlashcardAntiMetadataGuidelinesContext(),
    "GUIDELINES:",
    "1. Generate exactly 1 improved flashcard based on the user's instruction.",
    "2. Base the content EXCLUSIVELY on the SOURCES section below. Do not use outside knowledge.",
    "3. If the sources contain no relevant information, improve the card using only the existing content.",
    "4. Respond in the same language the user writes in.",
    "5. The user's instruction is a strict coverage requirement. Keep the improved card focused on the requested topic when" +
      " the sources support it.",
    createFlashcardResponseFormatContext(),
    createFlashcardContext(front, back),
    createEducationalResourcesContext(context),
  ].join("\n");
}
