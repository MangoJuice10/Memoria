export const formFieldNameCodes = [
    "USERNAME",
    "EMAIL",
    "PASSWORD",
    "NEW_USERNAME",
    "NEW_EMAIL",
    "OLD_PASSWORD",
    "NEW_PASSWORD",
    "CONFIRM_PASSWORD",
    "FRONT",
    "BACK",
    "NAME",
    "DESCRIPTION",
    "IS_PUBLIC",
    "TITLE",
    "CONTENT",
] as const;

export type FormFieldNameCode = (typeof formFieldNameCodes)[number];

export const formFieldPropertyCodes = [
    "NAME",
    "PLACEHOLDER"
] as const;

export type FormFieldPropertyCode = (typeof formFieldPropertyCodes)[number];

export const formFieldNamePropertyCodes = Object.fromEntries(
    formFieldNameCodes.flatMap((formFieldNameCode) =>
        formFieldPropertyCodes.map((formFieldPropertyCode) => {
            const code = `${formFieldNameCode}_${formFieldPropertyCode}`;
            return [code, code];
        })
    )
) as { [K in `${FormFieldNameCode}_${FormFieldPropertyCode}`]: K };

export type FormFieldNamePropertyCode = (typeof formFieldNamePropertyCodes)[keyof typeof formFieldNamePropertyCodes];

export const formCodes = {
    ...formFieldNamePropertyCodes,
};

export type FormCode = (typeof formCodes)[keyof typeof formCodes];