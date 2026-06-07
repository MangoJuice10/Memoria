import { ForbiddenError } from "src/common/errors/forbidden.error";
import { forbiddenErrorCodes } from "src/common/constants";

export class FeedbackForbiddenError extends ForbiddenError {
  constructor() {
    super("Feedback forbidden", forbiddenErrorCodes.FEEDBACK_FORBIDDEN);
  }
}
