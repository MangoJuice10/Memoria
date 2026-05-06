const baseKey = "resources";

export type Resource =
    | "USER";

export const Resources: Record<Resource, string> = {
    USER: `${baseKey}.user`
};