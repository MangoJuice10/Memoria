import { DomainError } from "src/common/errors";

export class InvalidPasswordError extends DomainError {
  constructor(password: string) {
    super(`Invalid password ${password}`);
    this.name = "InvalidPasswordError";
  }
}
