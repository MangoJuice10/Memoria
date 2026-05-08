import { DomainError } from "./domain.error";
import type { ForbiddenErrorCode } from "src/common/constants";

export class ForbiddenError extends DomainError {
  constructor(
    message: string,
    public code: ForbiddenErrorCode,
  ) {
    super(message, code);
  }
}
