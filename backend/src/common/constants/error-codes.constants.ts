import { httpExceptionErrorCodes } from "./http-exception-error-codes.constants";
import { domainErrorCodes } from "./domain-error-codes.constants";

export const errorCodes = {
  ...httpExceptionErrorCodes,
  ...domainErrorCodes,
};

export type ErrorCode = (typeof errorCodes)[keyof typeof errorCodes];
