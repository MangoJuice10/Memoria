import { DomainError } from "src/common/errors";
import { domainErrorCodes } from "src/common/constants";

export class FlashcardGenerationFailedError extends DomainError {
  constructor() {
    super("Flashcard generation failed", domainErrorCodes.FLASHCARD_GENERATION_FAILED);
  }
}
