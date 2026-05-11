import { httpExceptionErrorCodes } from "./http-exception-errors.config";
import { domainErrorCodes } from "./domain-errors.config";

export const errorCodes = {
    ...httpExceptionErrorCodes,
    ...domainErrorCodes,
};

export type ErrorCode = (typeof errorCodes)[keyof typeof errorCodes];