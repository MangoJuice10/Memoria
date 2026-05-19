export const resourceNameCodes = [
    "USER",
    "USER_AVATAR",
    "FLASHCARD",
    "DECK",
    "DECK_COVER",
] as const;

export type ResourceNameCode = (typeof resourceNameCodes)[number];