import { NotFoundError } from "src/common/errors";
import { notFoundErrorCodes } from "src/common/constants";

export class DeckNotFoundError extends NotFoundError {
  constructor() {
    super("Deck not found", notFoundErrorCodes.DECK_NOT_FOUND);
  }
}
