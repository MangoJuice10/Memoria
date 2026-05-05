import { DomainError } from "src/common/errors";
import { ErrorDetail } from "src/common/types";

export class ValidationError extends DomainError {
  constructor(
    message: string,
    public details: ErrorDetail[],
  ) {
    super(message, "VALIDATION_ERROR");
  }
}
