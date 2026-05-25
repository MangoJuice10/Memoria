export const resourceActionCodes = [
    "CREATE",
    "UPDATE",
    "DELETE"
] as const;

export type ResourceActionCode = (typeof resourceActionCodes)[number];

export const resourceActionPropertyCodes = [
    "NAME",
    "DESCRIPTION",
    "HINT",
    "CANCEL",
    "CONFIRM",
    "SUCCESS",
    "PENDING",
    "ERROR",
] as const;

export type ResourceActionPropertyCode = (typeof resourceActionPropertyCodes)[number];