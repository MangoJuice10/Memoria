import { NotFoundError } from "src/common/errors";
import { domainErrorCodes } from "src/common/constants";

export class ChatMessageNotFoundError extends NotFoundError {
  constructor() {
    super("Chat message not found", domainErrorCodes.CHAT_MESSAGE_NOT_FOUND);
  }
}
