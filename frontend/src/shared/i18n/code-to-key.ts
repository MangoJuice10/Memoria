import {
    resourceNameCodes,
    resourceActionCodes,
    resourceActionPropertyCodes,
    type ResourceNameActionPropertyCode,
    type ResourceCode,
    formFieldNameCodes,
    formFieldPropertyCodes,
    type FormFieldNamePropertyCode,
    type MenuCode,
    type FormCode,
    type ErrorCode,
} from "@/shared/config";

export type TranslationCode = ResourceCode | MenuCode | FormCode | ErrorCode;

const baseResourceKey = "resources";
const resourceNameKey = "name";
const resourcePropertiesKey = "properties";
const resourceActionsKey = "actions";

const resourceNameActionPropertyKeys = Object.fromEntries(
    resourceNameCodes.flatMap((resourceNameCode) =>
        resourceActionCodes.flatMap((resourceActionCode) =>
            resourceActionPropertyCodes.map((resourceActionPropertyCode) => {
                const code: ResourceNameActionPropertyCode = `${resourceNameCode}_${resourceActionCode}_${resourceActionPropertyCode}`;

                const resourceNameKey = resourceNameCode.toLowerCase();
                const resourceActionKey = resourceActionCode.toLowerCase();
                const resourceActionPropertyKey = resourceActionPropertyCode.toLowerCase();

                const resourceNameActionPropertyKey = `${baseResourceKey}.${resourceNameKey}.${resourceActionsKey}.${resourceActionKey}.${resourceActionPropertyKey}`;

                return [code, resourceNameActionPropertyKey];
            })
        )
    )
) as Record<ResourceNameActionPropertyCode, string>;

const baseNavbarItemKey = "navigation.navbar.navigation-links";
const baseSidebarItemKey = "navigation.sidebar.navigation-links";
const baseSidebarSectionKey = "navigation.sidebar.sections";
const baseFooterItemKey = "navigation.footer.navigation-links";
const baseFooterSectionKey = "navigation.footer.sections";

const baseSettingsKey = "settings.navigation-links";

const baseActionsKey = "actions";

const baseOptionsKey = "options";

const baseFormFieldKey = "form.fields";

const formFieldNamePropertyKeys = Object.fromEntries(
    formFieldNameCodes.flatMap((formFieldNameCode) =>
        formFieldPropertyCodes.map((formFieldPropertyCode) => {
            const code: FormFieldNamePropertyCode = `${formFieldNameCode}_${formFieldPropertyCode}`;

            const formFieldNameKey = formFieldNameCode.toLowerCase();
            const formFieldPropertyKey = formFieldPropertyCode.toLowerCase();

            const formFieldNamePropertyKey = `${baseFormFieldKey}.${formFieldNameKey}.${formFieldPropertyKey}`;

            return [code, formFieldNamePropertyKey];
        })
    )
) as Record<FormFieldNamePropertyCode, string>;

const baseHttpExceptionErrorKey = "errors.http-exception";
const baseDomainErrorKey = "errors.domain";
const baseValidationErrorKey = `${baseDomainErrorKey}.validation`;
const baseNotFoundErrorKey = `${baseDomainErrorKey}.not-found`;

const codesToKeys = {
    ...resourceNameActionPropertyKeys,

    NAVBAR_ITEM_FEATURE_SPACED_REPETITION: `${baseNavbarItemKey}.feature-spaced-repetition`,
    NAVBAR_ITEM_FEATURE_AI_ASSISTANCE: `${baseNavbarItemKey}.feature-ai-assistance`,
    NAVBAR_ITEM_FEATURE_TRUSTWORTHY_ANSWERS: `${baseNavbarItemKey}.feature-trustworthy-answers`,
    NAVBAR_ITEM_DECKS: `${baseNavbarItemKey}.decks`,
    NAVBAR_ITEM_SHARED_DECKS: `${baseNavbarItemKey}.shared-decks`,
    NAVBAR_ITEM_EDUCATIONAL_RESOURCES: `${baseNavbarItemKey}.educational-resources`,

    SIDEBAR_SECTION_FEATURES: `${baseSidebarSectionKey}.features`,
    SIDEBAR_SECTION_ABOUT: `${baseSidebarSectionKey}.about`,
    SIDEBAR_SECTION_MY_DECKS: `${baseSidebarSectionKey}.decks`,

    SIDEBAR_ITEM_FEATURE_SPACED_REPETITION: `${baseSidebarItemKey}.feature-spaced-repetition`,
    SIDEBAR_ITEM_FEATURE_AI_ASSISTANCE: `${baseSidebarItemKey}.feature-ai-assistance`,
    SIDEBAR_ITEM_FEATURE_TRUSTWORTHY_ANSWERS: `${baseSidebarItemKey}.feature-trustworthy-answers`,
    SIDEBAR_ITEM_FEATURE_STATISTICS: `${baseSidebarItemKey}.feature-statistics`,
    SIDEBAR_ITEM_ABOUT: `${baseSidebarItemKey}.about`,

    FOOTER_SECTION_FEATURES: `${baseFooterSectionKey}.features`,

    FOOTER_ITEM_FEATURE_SPACED_REPETITION: `${baseFooterItemKey}.feature-spaced-repetition`,
    FOOTER_ITEM_FEATURE_AI_ASSISTANCE: `${baseFooterItemKey}.feature-ai-assistance`,
    FOOTER_ITEM_FEATURE_TRUSTWORTHY_ANSWERS: `${baseFooterItemKey}.feature-trustworthy-answers`,
    FOOTER_ITEM_FEATURE_STATISTICS: `${baseFooterItemKey}.feature-statistics`,

    SETTINGS_PROFILE: `${baseSettingsKey}.profile`,
    SETTINGS_THEME: `${baseSettingsKey}.theme`,
    SETTINGS_LANGUAGE: `${baseSettingsKey}.language`,

    USER_PANEL_SETTINGS: `${baseActionsKey}.settings`,
    USER_PANEL_CHANGE_THEME: `${baseActionsKey}.change-theme`,
    USER_PANEL_CHANGE_LANGUAGE: `${baseActionsKey}.change-language`,
    USER_PANEL_LOGOUT: `${baseActionsKey}.logout`,

    OPTIONS_EDIT: `${baseOptionsKey}.edit`,
    OPTIONS_DELETE: `${baseOptionsKey}.delete`,

    ...formFieldNamePropertyKeys,

    USER_RESOURCE_NAME: `${baseResourceKey}.user.${resourceNameKey}`,
    USER_USERNAME: `${baseResourceKey}.user.${resourcePropertiesKey}.username`,
    USER_EMAIL: `${baseResourceKey}.user.${resourcePropertiesKey}.email`,
    USER_PASSWORD: `${baseResourceKey}.user.${resourcePropertiesKey}.password`,

    FLASHCARD_RESOURCE_NAME: `${baseResourceKey}.flashcard.${resourceNameKey}`,
    FLASHCARD_FRONT: `${baseResourceKey}.flashcard.${resourcePropertiesKey}.front`,
    FLASHCARD_BACK: `${baseResourceKey}.flashcard.${resourcePropertiesKey}.back`,
    FLASHCARD_INTERVAL_DAYS: `${baseResourceKey}.flashcard.${resourcePropertiesKey}.interval-days`,
    FLASHCARD_DUE_AT: `${baseResourceKey}.flashcard.${resourcePropertiesKey}.due-at`,

    DECK_RESOURCE_NAME: `${baseResourceKey}.deck.${resourceNameKey}`,
    DECK_NAME: `${baseResourceKey}.deck.${resourcePropertiesKey}.name`,
    DECK_DESCRIPTION: `${baseResourceKey}.deck.${resourcePropertiesKey}.description`,
    DECK_IS_PUBLIC: `${baseResourceKey}.deck.${resourcePropertiesKey}.is-public`,
    DECK_PUBLIC: `${baseResourceKey}.deck.${resourcePropertiesKey}.public`,
    DECK_PRIVATE: `${baseResourceKey}.deck.${resourcePropertiesKey}.private`,
    DECK_FLASHCARDS_COUNT: `${baseResourceKey}.deck.${resourcePropertiesKey}.flashcards-count`,
    DECK_INFO: `${baseResourceKey}.deck.${resourcePropertiesKey}.info`,
    DECK_FLASHCARDS: `${baseResourceKey}.deck.${resourcePropertiesKey}.flashcards`,
    DECK_EDUCATIONAL_RESOURCES: `${baseResourceKey}.deck.${resourcePropertiesKey}.educational_resources`,

    BAD_REQUEST: `${baseHttpExceptionErrorKey}.bad-request`,
    UNAUTHORIZED: `${baseHttpExceptionErrorKey}.unauthorized`,
    FORBIDDEN: `${baseHttpExceptionErrorKey}.forbidden.name`,
    UNPROCESSABLE_ENTITY: `${baseHttpExceptionErrorKey}.unprocessable-entity`,
    NOT_FOUND: `${baseHttpExceptionErrorKey}.not-found`,
    CONFLICT: `${baseHttpExceptionErrorKey}.conflict`,
    INTERNAL_SERVER_ERROR: `${baseHttpExceptionErrorKey}.internal-server-error`,

    VALIDATION_ERROR: `${baseDomainErrorKey}.error`,
    REQUIRED: `${baseValidationErrorKey}.required`,
    EMAIL: `${baseValidationErrorKey}.email`,
    EMAIL_ALREADY_EXISTS: `${baseValidationErrorKey}.email-already-exists`,
    INVALID_PASSWORD: `${baseValidationErrorKey}.invalid-password`,
    DUPLICATE_PASSWORD: `${baseValidationErrorKey}.duplicate-password`,
    CONFIRM_PASSWORD: `${baseValidationErrorKey}.confirm-password`,
    MIN_LENGTH: `${baseValidationErrorKey}.min-length`,
    MAX_LENGTH: `${baseValidationErrorKey}.max-length`,
    INVALID_MIME_TYPE: `${baseValidationErrorKey}.invalid-mime-type`,
    MAX_SIZE: `${baseValidationErrorKey}.max-size`,
    INVALID_TYPE: `${baseValidationErrorKey}.invalid-type`,
    UNRECOGNIZED: `${baseValidationErrorKey}.unrecognized`,

    USER_NOT_FOUND: `${baseNotFoundErrorKey}.user`,
    FLASHCARD_NOT_FOUND: `${baseNotFoundErrorKey}.flashcard`,
    DECK_NOT_FOUND: `${baseNotFoundErrorKey}.deck`,
} as const satisfies Record<TranslationCode, string>;

export function codeToKey(code: TranslationCode) {
    return codesToKeys[code] ?? "Error";
}