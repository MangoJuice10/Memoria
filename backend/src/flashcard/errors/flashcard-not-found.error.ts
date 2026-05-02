import { DomainError } from "src/common/errors";

export class FlashcardNotFoundError extends DomainError {
  constructor(flashcardId: number) {
    super(`Flashcard with id ${flashcardId} not found`);
    this.name = "FlashcardNotFoundError";
  }
}
