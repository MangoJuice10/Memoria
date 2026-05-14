export const getIdRouteParam = (param: string | string[] | undefined) => {
    if (!param) throw new Error("The ID route parameter is missing");
    if (param instanceof Array) throw new Error("The ID route parameter must not be an array");
    return Number(param);
}