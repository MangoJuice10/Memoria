const baseKey = "form.fields";

const titleKey = "title";
const placeholderKey = "placeholder";

export type FormTitle =
    | "USERNAME"
    | "EMAIL"
    | "PASSWORD"
    | "NEW_USERNAME"
    | "NEW_EMAIL"
    | "OLD_PASSWORD"
    | "NEW_PASSWORD"
    | "CONFIRM_PASSWORD";

export type FormField = {
    title: string;
    placeholder: string;
}

export const FormFields: Record<FormTitle, FormField> = {
    USERNAME: {
        title: `${baseKey}.username.${titleKey}`,
        placeholder: `${baseKey}.username.${placeholderKey}`
    },
    EMAIL: {
        title: `${baseKey}.email.${titleKey}`,
        placeholder: `${baseKey}.email.${placeholderKey}`
    },
    PASSWORD: {
        title: `${baseKey}.password.${titleKey}`,
        placeholder: `${baseKey}.password.${placeholderKey}`
    },
    NEW_USERNAME: {
        title: `${baseKey}.newUsername.${titleKey}`,
        placeholder: `${baseKey}.newUsername.${placeholderKey}`
    },
    NEW_EMAIL: {
        title: `${baseKey}.newEmail.${titleKey}`,
        placeholder: `${baseKey}.newEmail.${placeholderKey}`
    },
    OLD_PASSWORD: {
        title: `${baseKey}.old-password.${titleKey}`,
        placeholder: `${baseKey}.old-password.${placeholderKey}`
    },
    NEW_PASSWORD: {
        title: `${baseKey}.new-password.${titleKey}`,
        placeholder: `${baseKey}.new-password.${placeholderKey}`
    },
    CONFIRM_PASSWORD: {
        title: `${baseKey}.confirm-password.${titleKey}`,
        placeholder: `${baseKey}.confirm-password.${placeholderKey}`
    },
};