import {httpExceptionErrorCodes, domainErrorCodes} from "@/shared/config";

export const errorCodes = {
    ...httpExceptionErrorCodes,
    ...domainErrorCodes,
}

export type ErrorCode = (typeof errorCodes)[keyof typeof errorCodes];