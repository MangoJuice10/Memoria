import type {
    ResourceNameCode
} from "./resource-name.codes.ts";

type ResourcePropertyCode<R extends ResourceNameCode> = `${R}_${string}`;

export const userPropertyCodes = {
    USER_RESOURCE_NAME: "USER_RESOURCE_NAME",
    USER_USERNAME: "USER_USERNAME",
    USER_EMAIL: "USER_EMAIL",
    USER_PASSWORD: "USER_PASSWORD",
} satisfies Record<ResourcePropertyCode<"USER">, ResourcePropertyCode<"USER">>;

export const flashcardPropertyCodes = {
    FLASHCARD_RESOURCE_NAME: "FLASHCARD_RESOURCE_NAME",
    FLASHCARD_FRONT: "FLASHCARD_FRONT",
    FLASHCARD_BACK: "FLASHCARD_BACK",
    FLASHCARD_INTERVAL_DAYS: "FLASHCARD_INTERVAL_DAYS",
    FLASHCARD_DUE_AT: "FLASHCARD_DUE_AT",
} satisfies Record<ResourcePropertyCode<"FLASHCARD">, ResourcePropertyCode<"FLASHCARD">>;

export const deckPropertyCodes = {
    DECK_RESOURCE_NAME: "DECK_RESOURCE_NAME",
    DECK_NAME: "DECK_NAME",
    DECK_DESCRIPTION: "DECK_DESCRIPTION",
    DECK_IS_PUBLIC: "DECK_IS_PUBLIC",
    DECK_PUBLIC: "DECK_PUBLIC",
    DECK_PRIVATE: "DECK_PRIVATE",
    DECK_FLASHCARDS_COUNT: "DECK_FLASHCARDS_COUNT",
    DECK_INFO: "DECK_INFO",
    DECK_FLASHCARDS: "DECK_FLASHCARDS",
    DECK_EDUCATIONAL_RESOURCES: "DECK_EDUCATIONAL_RESOURCES",
} satisfies Record<ResourcePropertyCode<"DECK">, ResourcePropertyCode<"DECK">>;