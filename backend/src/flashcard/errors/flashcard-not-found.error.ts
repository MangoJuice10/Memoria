import { NotFoundError } from "src/common/errors";

export class FlashcardNotFoundError extends NotFoundError {
  constructor() {
    super("Flashcard not found");
  }
}
