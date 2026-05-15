export type SupportedSuccessStatusCodes = 200 | 201;
export type SupportedErrorStatusCodes = 400 | 401 | 403 | 404 | 409 | 422 | 500;

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
