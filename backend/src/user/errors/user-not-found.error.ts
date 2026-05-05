import { NotFoundError } from "src/common/errors";

export class UserNotFoundError extends NotFoundError {
  constructor() {
    super("User not found");
  }
}
