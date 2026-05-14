export function emptyStringToUndefined(value: string) {
    return value === ""
        ? undefined
        : value;
}