import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
} from "@nestjs/common";
import { Response } from "express";
import { ZodError } from "zod";

@Catch(ZodError)
export class ZodFilter implements ExceptionFilter {
  catch(exception: ZodError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 422;
    response.status(status).json({
      errors: exception.flatten(),
      statusCode: status,
    });
  }
}