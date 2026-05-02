import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import type { Response } from "express";
import { DomainError } from "src/common/errors";
import { InvalidPasswordError, UserNotFoundError } from "src/user/errors";
import { FlashcardNotFoundError } from "src/flashcard/errors/flashcard-not-found.error";
import { EmailAlreadyExistsError } from "src/user/errors/email-already-exists.error";

@Catch(DomainError)
export class DomainFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    switch (exception.constructor) {
      case UserNotFoundError:
      case FlashcardNotFoundError:
        res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          error: "Unauthorized",
          message: exception.message,
        });
        break;
      case EmailAlreadyExistsError:
        res.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          error: "Conflict",
          message: exception.message,
        });
        break;
      case InvalidPasswordError:
        res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          error: "Unauthorized",
          message: exception.message,
        });
        break;
      default:
        res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          error: "Bad Request",
          message: exception.message,
        });
        break;
    }
  }
}
