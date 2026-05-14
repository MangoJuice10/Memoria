export const resourceNameCodes = [
    "USER",
    "FLASHCARD",
    "DECK"
] as const;

export type ResourceNameCode = (typeof resourceNameCodes)[number];

export const actionCodes = [
    "CREATE",
    "UPDATE",
    "DELETE"
] as const;

export type ActionCode = (typeof actionCodes)[number];

export const actionPropertyCodes = [
    "NAME",
    "DESCRIPTION",
    "CANCEL",
    "CONFIRM",
] as const;

export type ActionPropertyCode = (typeof actionPropertyCodes)[number];

export const resourceNameActionPropertyCodes = Object.fromEntries(
    resourceNameCodes.flatMap((resourceNameCode) =>
        actionCodes.flatMap((actionCode) =>
            actionPropertyCodes.map((actionPropertyCode) => {
                const code = `${resourceNameCode}_${actionCode}_${actionPropertyCode}`;
                return [code, code];
            })
        )
    )
) as { [K in `${ResourceNameCode}_${ActionCode}_${ActionPropertyCode}`]: K };

export type ResourceNameActionPropertyCode = (typeof resourceNameActionPropertyCodes)[keyof typeof resourceNameActionPropertyCodes];