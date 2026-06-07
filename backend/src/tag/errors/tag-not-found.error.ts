import { NotFoundError } from "src/common/errors";
import { notFoundErrorCodes } from "src/common/constants";

export class TagNotFoundError extends NotFoundError {
  constructor() {
    super("Tag not found", notFoundErrorCodes.TAG_NOT_FOUND);
  }
}
