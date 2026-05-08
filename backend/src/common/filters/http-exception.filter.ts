import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import type { Response } from "express";
import type { ErrorResponse, SupportedErrorStatusCodes } from "src/common/types";
import { httpExceptionErrorCodes } from "src/common/constants";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const statusCode = exception.getStatus() as SupportedErrorStatusCodes;
    const code = httpExceptionErrorCodes[exception.getStatus() as SupportedErrorStatusCodes];

    const body: ErrorResponse = {
      status: "error",
      statusCode,
      error: {
        code,
        message: exception.message,
      },
    };
    res.status(statusCode).json(body);
  }
}
