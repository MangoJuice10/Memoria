import { DomainError } from "src/common/errors";
import { domainErrorCodes } from "src/common/constants";

export class FlashcardGenerationError extends DomainError {
  constructor() {
    super("Flashcard generation error", domainErrorCodes.FLASHCARD_GENERATION_ERROR);
  }
}
