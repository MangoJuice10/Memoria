import {
    resourceNameCodes,
    type ResourceNameCode,
} from "./resource-name.codes";
import {
    resourceActionCodes,
    resourceActionPropertyCodes,
    type ResourceActionCode,
    type ResourceActionPropertyCode,
} from "./resource-action.codes";

export const resourceNameActionPropertyCodes = Object.fromEntries(
    resourceNameCodes.flatMap((resourceNameCode) =>
        resourceActionCodes.flatMap((resourceActionCode) =>
            resourceActionPropertyCodes.map((resourceActionPropertyCode) => {
                const code = `${resourceNameCode}_${resourceActionCode}_${resourceActionPropertyCode}`;
                return [code, code];
            })
        )
    )
) as { [K in `${ResourceNameCode}_${ResourceActionCode}_${ResourceActionPropertyCode}`]: K };

export type ResourceNameActionPropertyCode = (typeof resourceNameActionPropertyCodes)[keyof typeof resourceNameActionPropertyCodes];