import { createFlashcardRegenerationPrompt } from "src/flashcard/providers";
import { createEducationalResourcesContext } from "src/chat-message/constants";

const originalFlashcard = {
  front: "ORIGINAL_FRONT",
  back: "ORIGINAL_BACK",
};

const regeneratedFlashcard = {
  front: "REGENERATED_FRONT",
  back: "REGENERATED_BACK",
};

export const createFlashcardsRegenerationPromptMock: typeof createFlashcardRegenerationPrompt = (
  _front: string,
  _back: string,
  context: string,
) => {
  return [
    "You are a test assistant.",
    "If the SOURCES section below contains any content, output ONLY this exact JSON and nothing else:",
    JSON.stringify(regeneratedFlashcard),
    "If the SOURCES section is empty or blank, output ONLY this exact JSON and nothing else:",
    JSON.stringify(originalFlashcard),
    createEducationalResourcesContext(context),
  ].join("\n");
};
