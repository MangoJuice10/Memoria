import { createFlashcardGenerationPrompt } from "src/flashcard/providers";
import { createEducationalResourcesContext } from "src/chat-message/constants";

export const createFlashcardsGenerationPromptMock: typeof createFlashcardGenerationPrompt = (
  count: number,
  context: string,
) => {
  const testFlashcards = Array.from(
    {
      length: count,
    },
    (_, i) => ({
      front: `GENERATED_FRONT_${i + 1}`,
      back: `GENERATED_BACK_${i + 1}`,
    }),
  );

  return [
    "You are a test assistant.",
    "If the SOURCES section below contains any content, output ONLY this exact JSON and nothing else:",
    JSON.stringify(testFlashcards),
    "If the SOURCES section is empty or blank, output ONLY this exact JSON and nothing else: []",
    createEducationalResourcesContext(context),
  ].join("\n");
};
