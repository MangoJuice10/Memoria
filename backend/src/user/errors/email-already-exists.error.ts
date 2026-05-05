import { ValidationError } from "src/common/errors";
import { ErrorDetail } from "src/common/types";

export class EmailAlreadyExistsError extends ValidationError {
  constructor(details: ErrorDetail[]) {
    super("Email already exists", details);
  }
}
