import type {ErrorCode} from "@/shared/config";

const baseDomainErrorKey = "errors.domain";
const baseUserInputErrorKey = `${baseDomainErrorKey}.validation.details`;

export const codesToKeys: Record<ErrorCode, string> = {
    VALIDATION_ERROR: `${baseDomainErrorKey}.validation.name`,
    NOT_FOUND_ERROR: `${baseDomainErrorKey}.not-found.name`,
    UNAUTHORIZED: `${baseDomainErrorKey}.unauthorized.name`,
    REQUIRED: `${baseUserInputErrorKey}.required`,
    EMAIL: `${baseUserInputErrorKey}.email`,
    EMAIL_ALREADY_EXISTS: `${baseUserInputErrorKey}.email-already-exists`,
    INVALID_PASSWORD: `${baseUserInputErrorKey}.invalid-password`,
    DUPLICATE_PASSWORD: `${baseUserInputErrorKey}.duplicate-password`,
    CONFIRM_PASSWORD: `${baseUserInputErrorKey}.confirm-password`,
    MIN_LENGTH: `${baseUserInputErrorKey}.min-length`,
    MAX_LENGTH: `${baseUserInputErrorKey}.max-length`,
    UNRECOGNIZED: `${baseUserInputErrorKey}.unrecognized`
};

export function codeToKey(code: ErrorCode) {
    return codesToKeys[code] ?? "Error";
}