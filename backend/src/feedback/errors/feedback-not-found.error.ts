import { NotFoundError } from "src/common/errors";
import { notFoundErrorCodes } from "src/common/constants";

export class FeedbackNotFoundError extends NotFoundError {
  constructor() {
    super("Feedback not found", notFoundErrorCodes.FEEDBACK_NOT_FOUND);
  }
}
