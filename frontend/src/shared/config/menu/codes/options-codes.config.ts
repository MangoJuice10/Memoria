export const optionsCodes = {
    OPTIONS_EDIT: "OPTIONS_EDIT",
    OPTIONS_DELETE: "OPTIONS_DELETE",
} as const satisfies Record<`OPTIONS_${string}`, `OPTIONS_${string}`>;