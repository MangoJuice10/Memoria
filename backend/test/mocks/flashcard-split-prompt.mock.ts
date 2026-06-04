import { createEducationalResourcesContext } from "src/chat-message/constants";
import {
  createFlashcardSplitPrompt,
  Split,
} from "src/flashcard/providers/flashcard-split-prompt.provider";

export const createFlashcardSplitPromptMock: typeof createFlashcardSplitPrompt = (
  _front: string,
  _back: string,
  context: string,
  split: Split,
) => {
  const count = split.mode === "manual" ? split.count : 2;

  const withSources = Array.from({ length: count }, (_, i) => ({
    front: `SPLIT_FRONT_${i + 1}`,
    back: `SPLIT_BACK_${i + 1}`,
  }));

  const withoutSources = Array.from({ length: count }, (_, i) => ({
    front: `ORIGINAL_SPLIT_FRONT_${i + 1}`,
    back: `ORIGINAL_SPLIT_BACK_${i + 1}`,
  }));

  return [
    "You are a test assistant.",
    "If the SOURCES section below contains any content, output ONLY this exact JSON and nothing else:",
    JSON.stringify(withSources),
    "If the SOURCES section is empty or blank, output ONLY this exact JSON and nothing else:",
    JSON.stringify(withoutSources),
    createEducationalResourcesContext(context),
  ].join("\n");
};
