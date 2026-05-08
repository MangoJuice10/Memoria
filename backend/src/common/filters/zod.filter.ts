import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { ZodError } from "zod";
import { ErrorDetail, ErrorResponse } from "src/common/types";
import { isValidationErrorCode } from "src/common/constants";

@Catch(ZodError)
export class ZodFilter implements ExceptionFilter {
  catch(exception: ZodError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    const statusCode = HttpStatus.UNPROCESSABLE_ENTITY;

    const errorsMap = new Map<string, ErrorDetail>();
    for (const issue of exception.issues) {
      if (!isValidationErrorCode(issue.message)) continue;

      const path = issue.path.map(String).join(".");

      const pathErrors = errorsMap.get(path);
      if (!pathErrors) {
        errorsMap.set(path, {
          path,
          code: issue.message,
          message: issue.message,
        });
      }
    }

    const details = [...errorsMap.values()];

    const body: ErrorResponse = {
      status: "error",
      statusCode,
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        details
      },
    };

    res.status(statusCode).json(body);
  }
}
