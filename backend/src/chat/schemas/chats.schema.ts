import { z } from "zod";

export const MIN_CHAT_TITLE_LENGTH = 1;
export const MAX_CHAT_TITLE_LENGTH = 100;

export const chatTitleSchema = z.string().trim().min(MIN_CHAT_TITLE_LENGTH).max(MAX_CHAT_TITLE_LENGTH);
