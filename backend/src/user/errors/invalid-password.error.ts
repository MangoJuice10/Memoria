import { ValidationError } from "src/common/errors";
import { ErrorDetail } from "src/common/types";

export class InvalidPasswordError extends ValidationError {
  constructor(details: ErrorDetail[]) {
    super("Invalid password", details);
  }
}
