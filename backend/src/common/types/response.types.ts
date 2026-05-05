import { DomainErrorCode, UserInputErrorCode } from "src/common/constants";

export type SuccessResponse<T> = {
  status: "success";
  statusCode: 200 | 201;
  data: T;
};

export type ErrorDetail = {
  path: string;
  code: UserInputErrorCode;
  message: string;
};

export type ErrorResponse =
  | {
      status: "error";
      statusCode: 400 | 401 | 403 | 404;
      error: {
        code: DomainErrorCode;
        message: string;
      };
    }
  | {
      status: "error";
      statusCode: 409 | 422;
      error: {
        code: DomainErrorCode;
        message: string;
        details: Array<ErrorDetail>;
      };
    };

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
