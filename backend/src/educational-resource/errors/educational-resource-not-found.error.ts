import { NotFoundError } from "src/common/errors";
import { notFoundErrorCodes } from "src/common/constants";

export class EducationalResourceNotFoundError extends NotFoundError {
  constructor() {
    super("Educational resource not found", notFoundErrorCodes.EDUCATIONAL_RESOURCE_NOT_FOUND);
  }
}