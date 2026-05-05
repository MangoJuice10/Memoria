import { DomainErrorCode } from "src/common/constants";

export class DomainError extends Error {
  constructor(
    message: string,
    public code: DomainErrorCode,
  ) {
    super(message);
  }
}
