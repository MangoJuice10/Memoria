import {
    resourceNameCodes,
    type ResourceNameCode,
} from "./resource-name-codes.config";
import {
    resourceActionCodes,
    resourceActionPropertyCodes,
    flashcardActionCodes,
    type ResourceActionCode,
    type ResourceActionPropertyCode,
    type FlashcardActionCode,
} from "./resource-action-codes.config";

export const resourceNameActionPropertyCodes = Object.fromEntries(
    resourceNameCodes.flatMap((resourceNameCode) =>
        resourceActionCodes.flatMap((resourceActionCode) =>
            resourceActionPropertyCodes.map((resourceActionPropertyCode) => {
                const code = `${resourceNameCode}_${resourceActionCode}_${resourceActionPropertyCode}`;
                return [code, code];
            })
        )
    )
) as { [K in `${ResourceNameCode}_${ResourceActionCode}_${ResourceActionPropertyCode}`]: K };

export type ResourceNameActionPropertyCode = (typeof resourceNameActionPropertyCodes)[keyof typeof resourceNameActionPropertyCodes];

export const flashcardNameActionPropertyCodes = Object.fromEntries(
    flashcardActionCodes.flatMap((flashcardActionCode) =>
        resourceActionPropertyCodes.map((resourceActionPropertyCode) => {
            const code = `FLASHCARD_${flashcardActionCode}_${resourceActionPropertyCode}`;
            return [code, code];
        })
    )
) as { [K in `FLASHCARD_${FlashcardActionCode}_${ResourceActionPropertyCode}`]: K };

export type FlashcardNameActionPropertyCode = (typeof flashcardNameActionPropertyCodes)[keyof typeof flashcardNameActionPropertyCodes];