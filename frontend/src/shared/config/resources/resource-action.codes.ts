export const resourceActionCodes = [
    "CREATE",
    "GENERATE",
    "UPDATE",
    "DELETE",
    "BATCH"
] as const;

export type ResourceActionCode = (typeof resourceActionCodes)[number];

export const resourceActionPropertyCodes = [
    "NAME",
    "DESCRIPTION",
    "HINT",
    "CANCEL",
    "CONFIRM",
    "DRAFT",
    "ROLLBACK",
    "SUCCESS",
    "PENDING",
    "ERROR",
] as const;

export type ResourceActionPropertyCode = (typeof resourceActionPropertyCodes)[number];