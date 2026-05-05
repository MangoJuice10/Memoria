import type {ErrorCode} from "@/shared/config";

const baseDomainErrorKey = "errors.domain";
const baseUserInputErrorKey = `${baseDomainErrorKey}.validation.details`;

export const codesToMessages: Record<ErrorCode, string> = {
    VALIDATION: `${baseDomainErrorKey}.validation`,
    NOT_FOUND: `${baseDomainErrorKey}.not-found`,
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
    return codesToMessages[code];
}