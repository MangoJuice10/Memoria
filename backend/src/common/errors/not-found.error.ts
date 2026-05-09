import { DomainError } from "src/common/errors";
import { NotFoundErrorCode } from "src/common/constants";

export class NotFoundError extends DomainError {
  constructor(message: string, code: NotFoundErrorCode) {
    super(message, code);
  }
}
