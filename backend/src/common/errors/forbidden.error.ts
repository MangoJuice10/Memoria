import { DomainError } from "./domain.error";
import type { MissingPermissionsErrorCode } from "src/common/constants";

export class ForbiddenError extends DomainError {
  constructor(
    message: string,
    public code: MissingPermissionsErrorCode,
  ) {
    super(message, code);
  }
}
