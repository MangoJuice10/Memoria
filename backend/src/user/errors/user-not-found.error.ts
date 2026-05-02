import { DomainError } from "src/common/errors";

export class UserNotFoundError extends DomainError {
  constructor(userId: number) {
    super(`User with id ${userId} not found`);
    this.name = "UserNotFoundError";
  }
}
