import {httpExceptionErrorCodes} from "./http-exception-error-codes.config";
import {domainErrorCodes} from "./domain-error-codes.config";

export const errorCodes = {
    ...httpExceptionErrorCodes,
    ...domainErrorCodes,
}

export type ErrorCode = (typeof errorCodes)[keyof typeof errorCodes];