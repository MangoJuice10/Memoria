import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import type { Response } from "express";
import { DomainError, NotFoundError, ValidationError } from "src/common/errors";
import { EmailAlreadyExistsError } from "src/user/errors";
import type { ErrorResponse } from "src/common/types";
import { ForbiddenError } from "src/common/errors/forbidden.error";

@Catch(DomainError)
export class DomainFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    switch (true) {
      case exception instanceof EmailAlreadyExistsError: {
        const statusCode = HttpStatus.CONFLICT;
        const body: ErrorResponse = {
          status: "error",
          statusCode,
          error: {
            message: exception.message,
            code: exception.code,
            details: exception.details,
          },
        };
        res.status(statusCode).json(body);
        break;
      }
      case exception instanceof ValidationError: {
        const statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
        const body: ErrorResponse = {
          status: "error",
          statusCode,
          error: {
            message: exception.message,
            code: exception.code,
            details: exception.details,
          },
        };
        res.status(statusCode).json(body);
        break;
      }
      case exception instanceof NotFoundError: {
        const statusCode = HttpStatus.NOT_FOUND;
        const body: ErrorResponse = {
          status: "error",
          statusCode,
          error: {
            message: exception.message,
            code: exception.code,
          },
        };
        res.status(statusCode).json(body);
        break;
      }
      case exception instanceof ForbiddenError: {
        const statusCode = HttpStatus.FORBIDDEN;
        const body: ErrorResponse = {
          status: "error",
          statusCode,
          error: {
            message: exception.message,
            code: exception.code,
          },
        };
        res.status(statusCode).json(body);
        break;
      }
      default:
        const statusCode = HttpStatus.BAD_REQUEST;
        const body: ErrorResponse = {
          status: "error",
          statusCode,
          error: {
            message: exception.message,
            code: exception.code,
          },
        };
        res.status(statusCode).json(body);
        break;
    }
  }
}
