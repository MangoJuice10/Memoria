const baseKey = "form.fields";

const titleKey = "title";
const placeholderKey = "placeholder";

export type FormTitle =
    | "username"
    | "email"
    | "password"
    | "newUsername"
    | "newEmail"
    | "oldPassword"
    | "newPassword"
    | "confirmPassword";

export type FormField = {
    title: string;
    placeholder: string;
}

export const FormFields: Record<FormTitle, FormField> = {
    username: {
        title: `${baseKey}.username.${titleKey}`,
        placeholder: `${baseKey}.username.${placeholderKey}`
    },
    email: {
        title: `${baseKey}.email.${titleKey}`,
        placeholder: `${baseKey}.email.${placeholderKey}`
    },
    password: {
        title: `${baseKey}.password.${titleKey}`,
        placeholder: `${baseKey}.password.${placeholderKey}`
    },
    newUsername: {
        title: `${baseKey}.newUsername.${titleKey}`,
        placeholder: `${baseKey}.newUsername.${placeholderKey}`
    },
    newEmail: {
        title: `${baseKey}.newEmail.${titleKey}`,
        placeholder: `${baseKey}.newEmail.${placeholderKey}`
    },
    oldPassword: {
        title: `${baseKey}.old-password.${titleKey}`,
        placeholder: `${baseKey}.old-password.${placeholderKey}`
    },
    newPassword: {
        title: `${baseKey}.new-password.${titleKey}`,
        placeholder: `${baseKey}.new-password.${placeholderKey}`
    },
    confirmPassword: {
        title: `${baseKey}.confirm-password.${titleKey}`,
        placeholder: `${baseKey}.confirm-password.${placeholderKey}`
    },
};