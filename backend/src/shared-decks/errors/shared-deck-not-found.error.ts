import { NotFoundError } from "src/common/errors";
import { notFoundErrorCodes } from "src/common/constants";

export class SharedDeckNotFoundError extends NotFoundError {
  constructor() {
    super("Shared deck not found", notFoundErrorCodes.SHARED_DECK_NOT_FOUND);
  }
}
