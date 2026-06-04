import { createQueryRewritePrompt } from "src/common/providers";

export const createQueryRewritePromptMock: typeof createQueryRewritePrompt = () => {
  return [
    "You are a test assistant.",
    "Output the user's query exactly as-is, without any changes.",
  ].join("\n");
}