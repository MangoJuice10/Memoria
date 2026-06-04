import { z } from "zod";

export const largeLanguageModelChatTitleSchema = z.string().trim().min(1).max(100);
