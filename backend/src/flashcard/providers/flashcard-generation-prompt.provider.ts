import {
  createEducationalResourcesContext, createFlashcardAntiMetadataGuidelinesContext,
  createFlashcardCoverageGuidelinesContext,
  createFlashcardQualityGuidelinesContext,
  createFlashcardStyleGuidelinesContext,
  createInstructionContext,
} from "src/chat-message/constants";

export const FLASHCARD_GENERATION_PROMPT = Symbol("FLASHCARD_GENERATION_PROMPT");

export function createFlashcardGenerationPrompt(
  count: number,
  instruction: string,
  context: string,
) {
  return [
    "You are a flashcard generation assistant for the Memoria learning platform.",
    "Your task is to generate study flashcards based ONLY on the provided source material.",
    "",
    createFlashcardQualityGuidelinesContext(),
    createFlashcardStyleGuidelinesContext(),
    createFlashcardCoverageGuidelinesContext(),
    createFlashcardAntiMetadataGuidelinesContext(),
    "",
    "GUIDELINES:",
    `1. Generate exactly ${count} flashcards.`,
    "2. Each flashcard must have a concise question or term on the front, and a clear, accurate answer on the back.",
    "3. Base every flashcard EXCLUSIVELY on the SOURCES section below. Do not use outside knowledge.",
    "4. If the sources contain no information relevant to the requested topic, return an empty array.",
    "5. CRITICAL: Respond with ONLY a valid JSON array. No prose, no markdown, no code fences.",
    "   The array must conform exactly to this structure:",
    '   [{ "front": "...", "back": "..." }, ...]',
    "6. Respond in the same language the user writes in.",
    "7. The user's instruction is a strict coverage requirement. Make sure the generated cards directly cover the requested topic when the sources support it.",
    "",
    createInstructionContext(instruction),
    "",
    createEducationalResourcesContext(context),
  ].join("\n");
}
