import { NotFoundError } from "src/common/errors";
import { domainErrorCodes } from "src/common/constants";

export class ChatNotFoundError extends NotFoundError {
  constructor() {
    super("Chat not found", domainErrorCodes.CHAT_NOT_FOUND);
  }
}
