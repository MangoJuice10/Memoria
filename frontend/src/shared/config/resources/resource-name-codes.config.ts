export const resourceNameCodes = [
    "USER",
    "USER_AVATAR",
    "FLASHCARD",
    "DECK",
    "DECK_COVER",
    "EDUCATIONAL_RESOURCE",
    "EDUCATIONAL_RESOURCE_COVER",
    "CHAT",
    "CHAT_MESSAGE",
] as const;

export type ResourceNameCode = (typeof resourceNameCodes)[number];