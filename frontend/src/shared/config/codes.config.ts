import {menuCodes} from "@/shared/config/menu/codes/menu-codes.config.ts";
import {resourceCodes} from "@/shared/config/resources/resource-codes.config.ts";
import {formCodes} from "@/shared/config/form/form-codes.config.ts";
import {errorCodes} from "@/shared/config/errors/error-codes.config.ts";

export const codes = {
    ...resourceCodes,
    ...menuCodes,
    ...formCodes,
    ...errorCodes
}

export type TranslationCode = (typeof codes)[keyof typeof codes];