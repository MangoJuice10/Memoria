import { NotFoundError } from "src/common/errors";

export class DeckNotFoundError extends NotFoundError {
  constructor() {
    super("Deck not found");
  }
}
