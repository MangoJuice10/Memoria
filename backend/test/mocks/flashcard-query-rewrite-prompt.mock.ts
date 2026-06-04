import { createFlashcardQueryRewritePrompt } from "src/flashcard/providers";

export const createFlashcardQueryRewritePromptMock: typeof createFlashcardQueryRewritePrompt = (
  _front: string,
  _back: string,
) => {
  return [
    "You are a test assistant.",
    "Output the user's query exactly as-is, without any changes.",
  ].join("\n");
};
