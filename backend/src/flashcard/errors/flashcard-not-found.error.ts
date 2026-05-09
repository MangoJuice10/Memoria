import { NotFoundError } from "src/common/errors";
import { notFoundErrorCodes } from "src/common/constants";

export class FlashcardNotFoundError extends NotFoundError {
  constructor() {
    super("Flashcard not found", notFoundErrorCodes.FLASHCARD_NOT_FOUND);
  }
}
