export const domainErrorCodes = {
    VALIDATION_ERROR: {
        name: "VALIDATION_ERROR",
        details: {
            REQUIRED: "REQUIRED",
            EMAIL: "EMAIL",
            MIN_LENGTH: "MIN_LENGTH",
            MAX_LENGTH: "MAX_LENGTH",
            INVALID_PASSWORD: "INVALID_PASSWORD",
            DUPLICATE_PASSWORD: "DUPLICATE_PASSWORD",
            CONFIRM_PASSWORD: "CONFIRM_PASSWORD",
            EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS",
            UNRECOGNIZED: "UNRECOGNIZED",
        } as const,
    },
    UNAUTHORIZED: {
        name: "UNAUTHORIZED",
    },
    NOT_FOUND_ERROR: {
        name: "NOT_FOUND_ERROR",
    },
} as const;

export type DomainErrorCode = keyof typeof domainErrorCodes;

export const isDomainErrorCode = (value: unknown): value is DomainErrorCode => {
    return (
        typeof value === "string" && Object.prototype.hasOwnProperty.call(domainErrorCodes, value)
    );
};

export const userInputErrorCodes = domainErrorCodes.VALIDATION_ERROR.details;

export type UserInputErrorCode = keyof typeof userInputErrorCodes;

export const isUserInputErrorCode = (value: unknown): value is UserInputErrorCode => {
    return (
        typeof value === "string" && Object.prototype.hasOwnProperty.call(userInputErrorCodes, value)
    );
};

export type ErrorCode = DomainErrorCode | UserInputErrorCode;