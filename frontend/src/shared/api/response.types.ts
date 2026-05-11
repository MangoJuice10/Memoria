import type {
    SupportedSuccessStatusCodes,
    SupportedErrorStatusCodes,
    ValidationErrorCode,
    ErrorCode,
} from "@/shared/config";

export type SuccessResponse<T> = {
    status: "success";
    statusCode: SupportedSuccessStatusCodes;
    data: T;
};

export type ErrorDetail = {
    path: string;
    code: ValidationErrorCode;
    message: string;
};

export type ErrorResponse =
    | {
    status: "error";
    statusCode: Exclude<SupportedErrorStatusCodes, 409 | 422>;
    error: {
        code: ErrorCode;
        message: string;
    };
} | {
    status: "error";
    statusCode: 409 | 422;
    error: {
        code: ErrorCode;
        message: string;
        details?: Array<ErrorDetail>;
    };
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
