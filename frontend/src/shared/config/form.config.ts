const baseKey = "form.fields";

const titleKey = "title";
const placeholderKey = "placeholder";

export type AuthTitle =
    | "USERNAME"
    | "EMAIL"
    | "PASSWORD"
    | "NEW_USERNAME"
    | "NEW_EMAIL"
    | "OLD_PASSWORD"
    | "NEW_PASSWORD"
    | "CONFIRM_PASSWORD";

export type DecksTitle =
    | "NAME"
    | "DESCRIPTION"
    | "IS_PUBLIC";

export type FlashcardsTitle =
    | "FRONT"
    | "BACK";

export type FormTitle = AuthTitle | DecksTitle | FlashcardsTitle;

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
    NAME: {
        title: `${baseKey}.name.${titleKey}`,
        placeholder: `${baseKey}.name.${placeholderKey}`
    },
    DESCRIPTION: {
        title: `${baseKey}.description.${titleKey}`,
        placeholder: `${baseKey}.description.${placeholderKey}`
    },
    IS_PUBLIC: {
        title: `${baseKey}.is-public.${titleKey}`,
        placeholder: `${baseKey}.is-public.${placeholderKey}`
    },
    FRONT: {
        title: `${baseKey}.front.${titleKey}`,
        placeholder: `${baseKey}.front.${placeholderKey}`
    },
    BACK: {
        title: `${baseKey}.back.${titleKey}`,
        placeholder: `${baseKey}.back.${placeholderKey}`
    }
};