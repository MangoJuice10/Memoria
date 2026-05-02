import { DomainError } from "src/common/errors";

export class EmailAlreadyExistsError extends DomainError {
  constructor(email: string) {
    super(`Email ${email} already exists.`);
    this.name = "EmailAlreadyExistsError";
  }
}
