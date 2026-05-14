import {
    resourceNameCodes,
    actionCodes,
    actionPropertyCodes,
    type ResourceNameActionPropertyCode,
    type ResourceCode,
    formFieldNameCodes,
    type FormFieldNamePropertyCode,
    formFieldPropertyCodes,
    type FormCode,
    type ErrorCode,
} from "@/shared/config";

export type TranslationCode = ResourceCode | FormCode | ErrorCode;

const baseResourceKey = "resources";
const resourceNameKey = "name";
const resourcePropertiesKey = "properties";
const resourceActionsKey = "actions";

const resourceNameActionPropertyKeys = Object.fromEntries(
    resourceNameCodes.flatMap((resourceNameCode) =>
        actionCodes.flatMap((actionCode) =>
            actionPropertyCodes.map((actionPropertyCode) => {
                const code: ResourceNameActionPropertyCode = `${resourceNameCode}_${actionCode}_${actionPropertyCode}`;

                const resourceKey = resourceNameCode.toLowerCase();
                const actionKey = actionCode.toLowerCase();
                const propertyKey = actionPropertyCode.toLowerCase();

                const resourceActionPropertyKey = `${baseResourceKey}.${resourceKey}.${resourceActionsKey}.${actionKey}.${propertyKey}`;

                return [code, resourceActionPropertyKey];
            })
        )
    )
) as Record<ResourceNameActionPropertyCode, string>;

const baseFormFieldKey = "form.fields";

const formFieldNamePropertyKeys = Object.fromEntries(
    formFieldNameCodes.flatMap((formFieldNameCode) =>
        formFieldPropertyCodes.map((formFieldPropertyCode) => {
            const code: FormFieldNamePropertyCode = `${formFieldNameCode}_${formFieldPropertyCode}`;

            const formFieldNameKey = formFieldNameCode.toLowerCase();
            const formFieldPropertyKey = formFieldPropertyCode.toLowerCase();

            const formFieldNamePropertyKey = `${baseFormFieldKey}.${formFieldNameKey}.${formFieldPropertyKey}`;

            return [code, formFieldNamePropertyKey];
        })
    )
) as Record<FormFieldNamePropertyCode, string>;

const baseHttpExceptionErrorKey = "errors.http-exception";
const baseDomainErrorKey = "errors.domain";
const baseValidationErrorKey = `${baseDomainErrorKey}.validation`;
const baseNotFoundErrorKey = `${baseDomainErrorKey}.not-found`;

const codesToKeys = {
    ...resourceNameActionPropertyKeys,

    ...formFieldNamePropertyKeys,

    USER_RESOURCE_NAME: `${baseResourceKey}.user.${resourceNameKey}`,
    USER_USERNAME: `${baseResourceKey}.user.${resourcePropertiesKey}.username`,
    USER_EMAIL: `${baseResourceKey}.user.${resourcePropertiesKey}.email`,
    USER_PASSWORD: `${baseResourceKey}.user.${resourcePropertiesKey}.password`,

    FLASHCARD_RESOURCE_NAME: `${baseResourceKey}.flashcard.${resourceNameKey}`,
    FLASHCARD_FRONT: `${baseResourceKey}.flashcard.${resourcePropertiesKey}.front`,
    FLASHCARD_BACK: `${baseResourceKey}.flashcard.${resourcePropertiesKey}.back`,
    FLASHCARD_INTERVAL_DAYS: `${baseResourceKey}.flashcard.${resourcePropertiesKey}.interval-days`,
    FLASHCARD_DUE_AT: `${baseResourceKey}.flashcard.${resourcePropertiesKey}.due-at`,

    DECK_RESOURCE_NAME: `${baseResourceKey}.deck.${resourceNameKey}`,
    DECK_NAME: `${baseResourceKey}.deck.${resourcePropertiesKey}.name`,
    DECK_DESCRIPTION: `${baseResourceKey}.deck.${resourcePropertiesKey}.description`,
    DECK_IS_PUBLIC: `${baseResourceKey}.deck.${resourcePropertiesKey}.is-public`,
    DECK_PUBLIC: `${baseResourceKey}.deck.${resourcePropertiesKey}.public`,
    DECK_PRIVATE: `${baseResourceKey}.deck.${resourcePropertiesKey}.private`,
    DECK_FLASHCARDS_COUNT: `${baseResourceKey}.deck.${resourcePropertiesKey}.flashcards-count`,

    BAD_REQUEST: `${baseHttpExceptionErrorKey}.bad-request`,
    UNAUTHORIZED: `${baseHttpExceptionErrorKey}.unauthorized`,
    FORBIDDEN: `${baseHttpExceptionErrorKey}.forbidden.name`,
    UNPROCESSABLE_ENTITY: `${baseHttpExceptionErrorKey}.unprocessable-entity`,
    NOT_FOUND: `${baseHttpExceptionErrorKey}.not-found`,
    CONFLICT: `${baseHttpExceptionErrorKey}.conflict`,
    INTERNAL_SERVER_ERROR: `${baseHttpExceptionErrorKey}.internal-server-error`,

    VALIDATION_ERROR: `${baseDomainErrorKey}.error`,
    REQUIRED: `${baseValidationErrorKey}.required`,
    EMAIL: `${baseValidationErrorKey}.email`,
    EMAIL_ALREADY_EXISTS: `${baseValidationErrorKey}.email-already-exists`,
    INVALID_PASSWORD: `${baseValidationErrorKey}.invalid-password`,
    DUPLICATE_PASSWORD: `${baseValidationErrorKey}.duplicate-password`,
    CONFIRM_PASSWORD: `${baseValidationErrorKey}.confirm-password`,
    MIN_LENGTH: `${baseValidationErrorKey}.min-length`,
    MAX_LENGTH: `${baseValidationErrorKey}.max-length`,
    INVALID_MIME_TYPE: `${baseValidationErrorKey}.invalid-mime-type`,
    MAX_SIZE: `${baseValidationErrorKey}.max-size`,
    INVALID_TYPE: `${baseValidationErrorKey}.invalid-type`,
    UNRECOGNIZED: `${baseValidationErrorKey}.unrecognized`,

    USER_NOT_FOUND: `${baseNotFoundErrorKey}.user`,
    FLASHCARD_NOT_FOUND: `${baseNotFoundErrorKey}.flashcard`,
    DECK_NOT_FOUND: `${baseNotFoundErrorKey}.deck`,
} as const satisfies Record<TranslationCode, string>;

export function codeToKey(code: TranslationCode) {
    return codesToKeys[code] ?? "Error";
}