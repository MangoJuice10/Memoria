import {
    userPropertyCodes,
    flashcardPropertyCodes,
    deckPropertyCodes,
    educationalResourcePropertyCodes,
    chatPropertyCodes,
    chatMessagePropertyCodes
} from "./resource-property-codes.config";
import {resourceNameActionPropertyCodes} from "./resource-name-action-property-codes.config";

export const resourceCodes = {
    ...userPropertyCodes,
    ...flashcardPropertyCodes,
    ...deckPropertyCodes,
    ...educationalResourcePropertyCodes,
    ...chatPropertyCodes,
    ...chatMessagePropertyCodes,
    ...resourceNameActionPropertyCodes
}

export type ResourceCode = (typeof resourceCodes)[keyof typeof resourceCodes];