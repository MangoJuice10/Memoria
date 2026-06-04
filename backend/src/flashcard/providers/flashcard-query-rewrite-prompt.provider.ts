import { createFlashcardContext } from "src/chat-message/constants";
import { createQueryRewritePrompt } from "src/common/providers";

export const FLASHCARD_QUERY_REWRITE_PROMPT = Symbol("FLASHCARD_QUERY_REWRITE_PROMPT");

export function createFlashcardQueryRewritePrompt(front: string, back: string) {
  return [createQueryRewritePrompt(), createFlashcardContext(front, back)].join("\n");
}