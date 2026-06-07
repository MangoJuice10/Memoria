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
  USER_NOT_FOUND: "USER_NOT_FOUND",
  FLASHCARD_NOT_FOUND: "FLASHCARD_NOT_FOUND",
  DECK_NOT_FOUND: "DECK_NOT_FOUND",
  EDUCATIONAL_RESOURCE_NOT_FOUND: "EDUCATIONAL_RESOURCE_NOT_FOUND",
  DECK_EDUCATIONAL_RESOURCE_NOT_FOUND: "DECK_EDUCATIONAL_RESOURCE_NOT_FOUND",
  CHAT_NOT_FOUND: "CHAT_NOT_FOUND",
  CHAT_MESSAGE_NOT_FOUND: "CHAT_MESSAGE_NOT_FOUND",
  TAG_NOT_FOUND: "TAG_NOT_FOUND",
  FEEDBACK_NOT_FOUND: "FEEDBACK_NOT_FOUND",
  SHARED_DECK_NOT_FOUND: "SHARED_DECK_NOT_FOUND",
} as const;

export type NotFoundErrorCode = (typeof notFoundErrorCodes)[keyof typeof notFoundErrorCodes];

export const missingPermissionsErrorCodes = {
} as const;

export type MissingPermissionsErrorCode = (typeof missingPermissionsErrorCodes)[keyof typeof missingPermissionsErrorCodes];

export const forbiddenErrorCodes = {
  DECK_COPY_FORBIDDEN: "DECK_COPY_FORBIDDEN",
  FEEDBACK_FORBIDDEN: "FEEDBACK_FORBIDDEN",
} as const;

export type ForbiddenErrorCode = (typeof forbiddenErrorCodes)[keyof typeof forbiddenErrorCodes];

export const domainErrorCodes = {
  ...validationErrorCodes,
  ...notFoundErrorCodes,
  ...missingPermissionsErrorCodes,
  ...forbiddenErrorCodes,
  FLASHCARD_GENERATION_ERROR: "FLASHCARD_GENERATION_ERROR",
} as const;

export type DomainErrorCode = keyof typeof domainErrorCodes;

export const isDomainErrorCode = (value: unknown): value is DomainErrorCode => {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(domainErrorCodes, value);
};