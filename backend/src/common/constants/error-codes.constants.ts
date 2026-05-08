import { SupportedErrorStatusCodes } from "src/common/types";

export const httpExceptionErrorCodes = {
  400: "BAD_REQUEST",
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  409: "CONFLICT",
  422: "UNPROCESSABLE_ENTITY",
  500: "INTERNAL_SERVER_ERROR",
} as const satisfies Record<SupportedErrorStatusCodes, string>;

export type HttpExceptionErrorCode =
  (typeof httpExceptionErrorCodes)[keyof typeof httpExceptionErrorCodes];

export const validationErrorCodes = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  REQUIRED: "REQUIRED",
  EMAIL: "EMAIL",
  MIN_LENGTH: "MIN_LENGTH",
  MAX_LENGTH: "MAX_LENGTH",
  INVALID_PASSWORD: "INVALID_PASSWORD",
  DUPLICATE_PASSWORD: "DUPLICATE_PASSWORD",
  CONFIRM_PASSWORD: "CONFIRM_PASSWORD",
  EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS",
  INVALID_TYPE: "INVALID_TYPE",
  UNRECOGNIZED: "UNRECOGNIZED",
} as const;

export type ValidationErrorCode = (typeof validationErrorCodes)[keyof typeof validationErrorCodes];

export const isValidationErrorCode = (value: unknown): value is ValidationErrorCode => {
  return (
    typeof value === "string" && Object.prototype.hasOwnProperty.call(validationErrorCodes, value)
  );
};

export const notFoundErrorCodes = {
  NOT_FOUND_ERROR: "NOT_FOUND_ERROR",
} as const;

export type NotFoundErrorCode = (typeof notFoundErrorCodes)[keyof typeof notFoundErrorCodes];

export const forbiddenErrorCodes = {
  FORBIDDEN_ERROR: "FORBIDDEN_ERROR",
} as const;

export type ForbiddenErrorCode = (typeof forbiddenErrorCodes)[keyof typeof forbiddenErrorCodes];

export const domainErrorCodes = {
  ...validationErrorCodes,
  ...notFoundErrorCodes,
  ...forbiddenErrorCodes,
};

export type DomainErrorCode = keyof typeof domainErrorCodes;

export const isDomainErrorCode = (value: unknown): value is DomainErrorCode => {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(domainErrorCodes, value);
};

export const errorCodes = {
  ...httpExceptionErrorCodes,
  ...domainErrorCodes
}

export type ErrorCode = (typeof errorCodes)[keyof typeof errorCodes];
