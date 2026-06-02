export const resourceActionCodes = [
    "CREATE",
    "UPDATE",
    "DELETE",
    "BATCH"
] as const;

export type ResourceActionCode = (typeof resourceActionCodes)[number];

export const flashcardActionCodes = [
    "GENERATE",
    "REGENERATE",
    "SPLIT",
] as const;

export type FlashcardActionCode = (typeof flashcardActionCodes)[number];

export const resourceActionPropertyCodes = [
    "NAME",
    "DESCRIPTION",
    "HINT",
    "CANCEL",
    "CONFIRM",
    "DRAFT",
    "ROLLBACK",
    "SUCCESS",
    "PENDING",
    "ERROR",
] as const;

export type ResourceActionPropertyCode = (typeof resourceActionPropertyCodes)[number];