export const resourceActionCodes = [
    "CREATE",
    "UPDATE",
    "DELETE"
] as const;

export type ResourceActionCode = (typeof resourceActionCodes)[number];

export const resourceActionPropertyCodes = [
    "NAME",
    "DESCRIPTION",
    "CANCEL",
    "CONFIRM",
] as const;

export type ResourceActionPropertyCode = (typeof resourceActionPropertyCodes)[number];