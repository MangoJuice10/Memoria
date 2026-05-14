import {
    userPropertyCodes,
    flashcardPropertyCodes,
    deckPropertyCodes
} from "./resource-properties.config";
import {resourceNameActionPropertyCodes} from "./resource-name-action-properties.config.ts";

export const resourceCodes = {
    ...userPropertyCodes,
    ...flashcardPropertyCodes,
    ...deckPropertyCodes,
    ...resourceNameActionPropertyCodes
}

export type ResourceCode = (typeof resourceCodes)[keyof typeof resourceCodes];