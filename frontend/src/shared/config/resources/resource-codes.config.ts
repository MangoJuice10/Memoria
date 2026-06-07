import {
    userPropertyCodes,
    flashcardPropertyCodes,
    deckPropertyCodes,
    educationalResourcePropertyCodes,
    chatPropertyCodes,
    chatMessagePropertyCodes,
    /* ===== AI GENERATED CODE START ===== */
    sharedDeckPropertyCodes,
    feedbackPropertyCodes,
    /* ===== AI GENERATED CODE END ===== */
} from "./resource-property-codes.config";
import {
    flashcardNameActionPropertyCodes,
    resourceNameActionPropertyCodes
} from "./resource-name-action-property-codes.config";

export const resourceCodes = {
    ...userPropertyCodes,
    ...flashcardPropertyCodes,
    ...deckPropertyCodes,
    ...educationalResourcePropertyCodes,
    ...chatPropertyCodes,
    ...chatMessagePropertyCodes,
    /* ===== AI GENERATED CODE START ===== */
    ...sharedDeckPropertyCodes,
    ...feedbackPropertyCodes,
    /* ===== AI GENERATED CODE END ===== */
    ...resourceNameActionPropertyCodes,
    ...flashcardNameActionPropertyCodes,
};

export type ResourceCode = (typeof resourceCodes)[keyof typeof resourceCodes];