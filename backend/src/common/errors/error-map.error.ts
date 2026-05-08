import { ZodIssue } from "zod";
import { validationErrorCodes } from "src/common/constants";

export function errorMap(issue: any) {
  switch ((issue as ZodIssue).code) {
    case "invalid_type": {
      if (issue.input) return validationErrorCodes.INVALID_TYPE;
      return validationErrorCodes.REQUIRED;
    }
    case "unrecognized_keys":
      return validationErrorCodes.UNRECOGNIZED;
    case "too_small":
      return validationErrorCodes.MIN_LENGTH;
    case "too_big":
      return validationErrorCodes.MAX_LENGTH;

    default:
      return undefined;
  }
}
