import {
    userPropertyCodes,
    flashcardPropertyCodes,
    deckPropertyCodes,
    educationalResourcePropertyCodes
} from "./resource-property-codes.config";
import {resourceNameActionPropertyCodes} from "./resource-name-action-property-codes.config";

export const resourceCodes = {
    ...userPropertyCodes,
    ...flashcardPropertyCodes,
    ...deckPropertyCodes,
    ...educationalResourcePropertyCodes,
    ...resourceNameActionPropertyCodes
}

export type ResourceCode = (typeof resourceCodes)[keyof typeof resourceCodes];