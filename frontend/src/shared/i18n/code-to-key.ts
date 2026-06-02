import {
    resourceNameCodes,
    resourceActionPropertyCodes,
    type ResourceNameActionPropertyCode,
    formFieldNameCodes,
    formFieldPropertyCodes,
    type FormFieldNamePropertyCode,
    type TranslationCode, resourceActionCodes, flashcardActionCodes,
    type FlashcardNameActionPropertyCode
} from "@/shared/config";

const baseResourceKey = "resources";
const baseResourceNameKey = "name";
const baseResourcePropertiesKey = "properties";
const baseResourceActionsKey = "actions";

const resourceNameActionPropertyKeys = Object.fromEntries(
    resourceNameCodes.flatMap((resourceNameCode) =>
        resourceActionCodes.flatMap((resourceActionCode) =>
            resourceActionPropertyCodes.map((resourceActionPropertyCode) => {
                const code: ResourceNameActionPropertyCode = `${resourceNameCode}_${resourceActionCode}_${resourceActionPropertyCode}`;

                const resourceNameKey = resourceNameCode.toLowerCase();
                const resourceActionKey = resourceActionCode.toLowerCase();
                const resourceActionPropertyKey = resourceActionPropertyCode.toLowerCase();

                const resourceNameActionPropertyKey = `${baseResourceKey}.${resourceNameKey}.${baseResourceActionsKey}.${resourceActionKey}.${resourceActionPropertyKey}`;

                return [code, resourceNameActionPropertyKey];
            })
        )
    )
) as Record<ResourceNameActionPropertyCode, string>;

const flashcardNameActionPropertyKeys = Object.fromEntries(
    flashcardActionCodes.flatMap((flashcardActionCode) =>
        resourceActionPropertyCodes.map((resourceActionPropertyCode) => {
            const code: FlashcardNameActionPropertyCode = `FLASHCARD_${flashcardActionCode}_${resourceActionPropertyCode}`;

            const resourceNameKey = "flashcard";
            const resourceActionKey = flashcardActionCode.toLowerCase();
            const resourceActionPropertyKey = resourceActionPropertyCode.toLowerCase();

            const resourceNameActionPropertyKey = `${baseResourceKey}.${resourceNameKey}.${baseResourceActionsKey}.${resourceActionKey}.${resourceActionPropertyKey}`;

            return [code, resourceNameActionPropertyKey];
        })
    )
) as Record<FlashcardNameActionPropertyCode, string>;

const baseNavbarItemKey = "navigation.navbar.navigation-links";
const baseSidebarItemKey = "navigation.sidebar.navigation-links";
const baseSidebarSectionKey = "navigation.sidebar.sections";
const baseFooterItemKey = "navigation.footer.navigation-links";
const baseFooterSectionKey = "navigation.footer.sections";
const baseAuthItemKey = "navigation.auth.navigation-links";
const baseFlashcardItemKey = "navigation.flashcard.navigation-links";
const baseDeckItemKey = "navigation.deck.navigation-links";

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
    ...flashcardNameActionPropertyKeys,

    NAVBAR_ITEM_FEATURE_SPACED_REPETITION: `${baseNavbarItemKey}.feature-spaced-repetition`,
    NAVBAR_ITEM_FEATURE_AI_ASSISTANCE: `${baseNavbarItemKey}.feature-ai-assistance`,
    NAVBAR_ITEM_FEATURE_TRUSTWORTHY_ANSWERS: `${baseNavbarItemKey}.feature-trustworthy-answers`,
    NAVBAR_ITEM_DECKS: `${baseNavbarItemKey}.decks`,
    NAVBAR_ITEM_SHARED_DECKS: `${baseNavbarItemKey}.shared-decks`,
    NAVBAR_ITEM_EDUCATIONAL_RESOURCES: `${baseNavbarItemKey}.educational-resources`,

    SIDEBAR_SECTION_FEATURES: `${baseSidebarSectionKey}.features`,
    SIDEBAR_SECTION_ABOUT: `${baseSidebarSectionKey}.about`,
    SIDEBAR_SECTION_DECKS: `${baseSidebarSectionKey}.decks`,

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

    TAB_ITEM_LOGIN: `${baseAuthItemKey}.login`,
    TAB_ITEM_REGISTER: `${baseAuthItemKey}.register`,

    TAB_ITEM_CREATE_FLASHCARD: `${baseFlashcardItemKey}.create-flashcard`,
    TAB_ITEM_GENERATE_FLASHCARD: `${baseFlashcardItemKey}.generate-flashcard`,
    TAB_ITEM_UPDATE_FLASHCARD: `${baseFlashcardItemKey}.update-flashcard`,
    TAB_ITEM_REGENERATE_FLASHCARD: `${baseFlashcardItemKey}.regenerate-flashcard`,
    TAB_ITEM_SPLIT_FLASHCARD: `${baseFlashcardItemKey}.split-flashcard`,

    TAB_ITEM_INFO: `${baseDeckItemKey}.info`,
    TAB_ITEM_FLASHCARDS: `${baseDeckItemKey}.flashcards`,
    TAB_ITEM_EDUCATIONAL_RESOURCES: `${baseDeckItemKey}.educational_resources`,

    SETTINGS_PROFILE: `${baseSettingsKey}.profile`,
    SETTINGS_THEME: `${baseSettingsKey}.theme`,
    SETTINGS_LANGUAGE: `${baseSettingsKey}.language`,

    USER_PANEL_SETTINGS: `${baseActionsKey}.settings`,
    USER_PANEL_CHANGE_THEME: `${baseActionsKey}.change-theme`,
    USER_PANEL_CHANGE_LANGUAGE: `${baseActionsKey}.change-language`,
    USER_PANEL_LOGOUT: `${baseActionsKey}.logout`,

    OPTIONS_EDIT: `${baseOptionsKey}.edit`,
    OPTIONS_DELETE: `${baseOptionsKey}.delete`,
    OPTIONS_ROLLBACK: `${baseOptionsKey}.rollback`,

    ...formFieldNamePropertyKeys,

    USER_RESOURCE_NAME: `${baseResourceKey}.user.${baseResourceNameKey}`,
    USER_USERNAME: `${baseResourceKey}.user.${baseResourcePropertiesKey}.username`,
    USER_EMAIL: `${baseResourceKey}.user.${baseResourcePropertiesKey}.email`,
    USER_PASSWORD: `${baseResourceKey}.user.${baseResourcePropertiesKey}.password`,

    FLASHCARD_RESOURCE_NAME: `${baseResourceKey}.flashcard.${baseResourceNameKey}`,
    FLASHCARD_FRONT: `${baseResourceKey}.flashcard.${baseResourcePropertiesKey}.front`,
    FLASHCARD_BACK: `${baseResourceKey}.flashcard.${baseResourcePropertiesKey}.back`,
    FLASHCARD_INTERVAL_DAYS: `${baseResourceKey}.flashcard.${baseResourcePropertiesKey}.interval-days`,
    FLASHCARD_DUE_AT: `${baseResourceKey}.flashcard.${baseResourcePropertiesKey}.due-at`,
    FLASHCARD_DEFAULT_DUE_AT: `${baseResourceKey}.flashcard.${baseResourcePropertiesKey}.default_due_at`,

    DECK_RESOURCE_NAME: `${baseResourceKey}.deck.${baseResourceNameKey}`,
    DECK_NAME: `${baseResourceKey}.deck.${baseResourcePropertiesKey}.name`,
    DECK_DESCRIPTION: `${baseResourceKey}.deck.${baseResourcePropertiesKey}.description`,
    DECK_IS_PUBLIC: `${baseResourceKey}.deck.${baseResourcePropertiesKey}.is-public`,
    DECK_PUBLIC: `${baseResourceKey}.deck.${baseResourcePropertiesKey}.public`,
    DECK_PRIVATE: `${baseResourceKey}.deck.${baseResourcePropertiesKey}.private`,
    DECK_COVER: `${baseResourceKey}.deck.${baseResourcePropertiesKey}.cover`,
    DECK_FLASHCARDS_COUNT: `${baseResourceKey}.deck.${baseResourcePropertiesKey}.flashcards-count`,
    DECK_INFO: `${baseResourceKey}.deck.${baseResourcePropertiesKey}.info`,
    DECK_FLASHCARDS: `${baseResourceKey}.deck.${baseResourcePropertiesKey}.flashcards`,
    DECK_EDUCATIONAL_RESOURCES: `${baseResourceKey}.deck.${baseResourcePropertiesKey}.educational_resources`,

    EDUCATIONAL_RESOURCE_RESOURCE_NAME: `${baseResourceKey}.educational_resource.${baseResourceNameKey}`,
    EDUCATIONAL_RESOURCE_NAME: `${baseResourceKey}.educational_resource.${baseResourcePropertiesKey}.name`,
    EDUCATIONAL_RESOURCE_DESCRIPTION: `${baseResourceKey}.educational_resource.${baseResourcePropertiesKey}.description`,
    EDUCATIONAL_RESOURCE_FILE: `${baseResourceKey}.educational_resource.${baseResourcePropertiesKey}.file`,
    EDUCATIONAL_RESOURCE_COVER: `${baseResourceKey}.educational_resource.${baseResourcePropertiesKey}.cover`,

    CHAT_RESOURCE_NAME: `${baseResourceKey}.chat.${baseResourceNameKey}`,
    CHAT_TITLE: `${baseResourceKey}.chat.${baseResourcePropertiesKey}.title`,
    CHAT_DEFAULT_TITLE: `${baseResourceKey}.chat.${baseResourcePropertiesKey}.default_title`,
    CHAT_NO_MESSAGES: `${baseResourceKey}.chat.${baseResourcePropertiesKey}.no_messages`,

    CHAT_MESSAGE_RESOURCE_NAME: `${baseResourceKey}.chat_message.${baseResourceNameKey}`,
    CHAT_MESSAGE_CONTENT: `${baseResourceKey}.chat_message.${baseResourcePropertiesKey}.content`,

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
    MIN: `${baseValidationErrorKey}.min`,
    MAX: `${baseValidationErrorKey}.max`,
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
    return codesToKeys[code];
}