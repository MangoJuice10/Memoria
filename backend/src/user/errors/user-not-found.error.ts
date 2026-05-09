import { NotFoundError } from "src/common/errors";
import { notFoundErrorCodes } from "src/common/constants";

export class UserNotFoundError extends NotFoundError {
  constructor() {
    super("User not found", notFoundErrorCodes.USER_NOT_FOUND);
  }
}
