export const resourceNameCodes = [
    "USER",
    "FLASHCARD",
    "DECK"
] as const;

export type ResourceNameCode = (typeof resourceNameCodes)[number];