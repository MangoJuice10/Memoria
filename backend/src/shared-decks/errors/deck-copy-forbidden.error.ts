import { ForbiddenError } from "src/common/errors/forbidden.error";
import { forbiddenErrorCodes } from "src/common/constants";

export class DeckCopyForbiddenError extends ForbiddenError {
  constructor() {
    super("Deck copy forbidden", forbiddenErrorCodes.DECK_COPY_FORBIDDEN);
  }
}
