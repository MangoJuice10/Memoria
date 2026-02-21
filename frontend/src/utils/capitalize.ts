export const capitalize = <T extends string> (str: T): Capitalize<T> => {
    return str.charAt(0).toUpperCase().concat(str.slice(1)) as Capitalize<T>;
}