import type {ErrorCode} from "@/shared/config";

const baseHttpExceptionErrorKey = "errors.http-exception";

const baseDomainErrorKey = "errors.domain";
const baseValidationErrorKey = `${baseDomainErrorKey}.validation.details`;
const baseNotFoundErrorKey = `${baseDomainErrorKey}.not-found`;

export const codesToKeys: Record<ErrorCode, string> = {
    BAD_REQUEST: `${baseHttpExceptionErrorKey}.bad-request.name`,
    UNAUTHORIZED: `${baseHttpExceptionErrorKey}.unauthorized.name`,
    FORBIDDEN: `${baseHttpExceptionErrorKey}.forbidden.name`,
    UNPROCESSABLE_ENTITY: `${baseHttpExceptionErrorKey}.unprocessable-entity.name`,
    NOT_FOUND: `${baseHttpExceptionErrorKey}.not-found.name`,
    CONFLICT: `${baseHttpExceptionErrorKey}.conflict.name`,
    INTERNAL_SERVER_ERROR: `${baseHttpExceptionErrorKey}.not-found.name`,

    VALIDATION_ERROR: `${baseDomainErrorKey}.validation.name`,
    REQUIRED: `${baseValidationErrorKey}.required`,
    EMAIL: `${baseValidationErrorKey}.email`,
    EMAIL_ALREADY_EXISTS: `${baseValidationErrorKey}.email-already-exists`,
    INVALID_PASSWORD: `${baseValidationErrorKey}.invalid-password`,
    DUPLICATE_PASSWORD: `${baseValidationErrorKey}.duplicate-password`,
    CONFIRM_PASSWORD: `${baseValidationErrorKey}.confirm-password`,
    MIN_LENGTH: `${baseValidationErrorKey}.min-length`,
    MAX_LENGTH: `${baseValidationErrorKey}.max-length`,
    INVALID_TYPE: `${baseValidationErrorKey}.invalid-type`,
    UNRECOGNIZED: `${baseValidationErrorKey}.unrecognized`,

    USER_NOT_FOUND: `${baseNotFoundErrorKey}.user`,
    FLASHCARD_NOT_FOUND: `${baseNotFoundErrorKey}.flashcard`,
    DECK_NOT_FOUND: `${baseNotFoundErrorKey}.deck`,
};

export function codeToKey(code: ErrorCode) {
    return codesToKeys[code] ?? "Error";
}