import { ZodIssue } from "zod";
import { userInputErrorCodes } from "src/common/constants";

export function errorMap(issue: any) {
  switch ((issue as ZodIssue).code) {
    case "invalid_type":
      return userInputErrorCodes.REQUIRED;
    case "unrecognized_keys":
      return userInputErrorCodes.UNRECOGNIZED;
    case "too_small":
      return userInputErrorCodes.MIN_LENGTH;
    case "too_big":
      return userInputErrorCodes.MAX_LENGTH;

    default:
      return undefined;
  }
}
