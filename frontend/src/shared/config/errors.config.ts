export const domainErrorCodes = {
    VALIDATION: {
        name: "VALIDATION",
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
    NOT_FOUND: {
        name: "NOT_FOUND",
    },
} as const;

export type DomainErrorCode = keyof typeof domainErrorCodes;

export const isDomainErrorCode = (value: unknown): value is DomainErrorCode => {
    return (
        typeof value === "string" && Object.prototype.hasOwnProperty.call(domainErrorCodes, value)
    );
};

export const userInputErrorCodes = domainErrorCodes.VALIDATION.details;

export type UserInputErrorCode = keyof typeof userInputErrorCodes;

export const isUserInputErrorCode = (value: unknown): value is UserInputErrorCode => {
    return (
        typeof value === "string" && Object.prototype.hasOwnProperty.call(userInputErrorCodes, value)
    );
};

export type ErrorCode = DomainErrorCode | UserInputErrorCode;