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
    TAB_ITEM_TAGS: `${baseDeckItemKey}.tags`,
    TAB_ITEM_FEEDBACK: `${baseDeckItemKey}.feedback`,
    TAB_ITEM_STATISTICS: `${baseDeckItemKey}.statistics`,

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
    /* ===== AI GENERATED CODE START ===== */
    FLASHCARD_REVIEW_COMPLETE_TITLE: `${baseResourceKey}.flashcard.${baseResourcePropertiesKey}.review-complete-title`,
    FLASHCARD_REVIEW_COMPLETE_MESSAGE: `${baseResourceKey}.flashcard.${baseResourcePropertiesKey}.review-complete-message`,
    FLASHCARD_REVIEW_COMPLETE_BACK_TO_DECK: `${baseResourceKey}.flashcard.${baseResourcePropertiesKey}.review-complete-back-to-deck`,
    FLASHCARD_REVIEW_COMPLETE_CONGRATS: `${baseResourceKey}.flashcard.${baseResourcePropertiesKey}.review-complete-congrats`,
    /* ===== AI GENERATED CODE END ===== */

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
    /* ===== AI GENERATED CODE START ===== */
    DECK_SEARCH_PLACEHOLDER: `${baseResourceKey}.deck.${baseResourcePropertiesKey}.search-placeholder`,
    DECK_PAGE_DESCRIPTION: `${baseResourceKey}.deck.${baseResourcePropertiesKey}.page-description`,
    /* ===== AI GENERATED CODE END ===== */

    EDUCATIONAL_RESOURCE_RESOURCE_NAME: `${baseResourceKey}.educational_resource.${baseResourceNameKey}`,
    EDUCATIONAL_RESOURCE_NAME: `${baseResourceKey}.educational_resource.${baseResourcePropertiesKey}.name`,
    EDUCATIONAL_RESOURCE_DESCRIPTION: `${baseResourceKey}.educational_resource.${baseResourcePropertiesKey}.description`,
    EDUCATIONAL_RESOURCE_FILE: `${baseResourceKey}.educational_resource.${baseResourcePropertiesKey}.file`,
    EDUCATIONAL_RESOURCE_COVER: `${baseResourceKey}.educational_resource.${baseResourcePropertiesKey}.cover`,
    /* ===== AI GENERATED CODE START ===== */
    EDUCATIONAL_RESOURCE_SEARCH_PLACEHOLDER: `${baseResourceKey}.educational_resource.${baseResourcePropertiesKey}.search-placeholder`,
    EDUCATIONAL_RESOURCE_PAGE_DESCRIPTION: `${baseResourceKey}.educational_resource.${baseResourcePropertiesKey}.page-description`,
    /* ===== AI GENERATED CODE END ===== */

    CHAT_RESOURCE_NAME: `${baseResourceKey}.chat.${baseResourceNameKey}`,
    CHAT_TITLE: `${baseResourceKey}.chat.${baseResourcePropertiesKey}.title`,
    CHAT_DEFAULT_TITLE: `${baseResourceKey}.chat.${baseResourcePropertiesKey}.default_title`,
    CHAT_NO_MESSAGES: `${baseResourceKey}.chat.${baseResourcePropertiesKey}.no_messages`,

    CHAT_MESSAGE_RESOURCE_NAME: `${baseResourceKey}.chat_message.${baseResourceNameKey}`,
    CHAT_MESSAGE_CONTENT: `${baseResourceKey}.chat_message.${baseResourcePropertiesKey}.content`,

    /* ===== AI GENERATED CODE START ===== */
    SHARED_DECK_RESOURCE_NAME: `${baseResourceKey}.shared_deck.${baseResourceNameKey}`,
    SHARED_DECK_NAME: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.name`,
    SHARED_DECK_DESCRIPTION: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.description`,
    SHARED_DECK_OWNER: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.owner`,
    SHARED_DECK_RATING: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.rating`,
    SHARED_DECK_NO_RATING: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.no-rating`,
    SHARED_DECK_FLASHCARDS_COUNT: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.flashcards-count`,
    SHARED_DECK_REVIEWS: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.reviews`,
    SHARED_DECK_NO_REVIEWS: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.no-reviews`,
    SHARED_DECK_LEAVE_REVIEW: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.leave-review`,
    SHARED_DECK_ADD_TO_COLLECTION: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.add-to-collection`,
    SHARED_DECK_ADDING: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.adding`,
    SHARED_DECK_NO_DECKS_FOUND: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.no-decks-found`,
    SHARED_DECK_NO_DECKS_WITH_TAGS: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.no-decks-with-tags`,
    SHARED_DECK_NO_DECKS_WITH_RATING: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.no-decks-with-rating`,
    SHARED_DECK_NO_DECKS_YET: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.no-decks-yet`,
    SHARED_DECK_SEARCH_PLACEHOLDER: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.search-placeholder`,
    SHARED_DECK_FILTER_BY_RATING: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.filter-by-rating`,
    SHARED_DECK_FILTER_BY_TAGS: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.filter-by-tags`,
    SHARED_DECK_CLEAR_FILTERS: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.clear-filters`,
    SHARED_DECK_PAGE_TITLE: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.page-title`,
    SHARED_DECK_PAGE_DESCRIPTION: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.page-description`,
    SHARED_DECK_FLASHCARDS: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.flashcards`,
    SHARED_DECK_NO_FLASHCARDS: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.no-flashcards`,
    SHARED_DECK_SCROLL_HINT: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.scroll-hint`,
    SHARED_DECK_BE_FIRST_REVIEWER: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.be-first-reviewer`,
    SHARED_DECK_YOUR_DECK: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.your-deck`,
    SHARED_DECK_RATING_LABEL: `${baseResourceKey}.shared_deck.${baseResourcePropertiesKey}.rating-label`,

    FEEDBACK_RESOURCE_NAME: `${baseResourceKey}.feedback.${baseResourceNameKey}`,
    FEEDBACK_CONTENT: `${baseResourceKey}.feedback.${baseResourcePropertiesKey}.content`,
    FEEDBACK_RATING: `${baseResourceKey}.feedback.${baseResourcePropertiesKey}.rating`,
    FEEDBACK_RATING_REQUIRED: `${baseResourceKey}.feedback.${baseResourcePropertiesKey}.rating-required`,
    FEEDBACK_CONTENT_PLACEHOLDER: `${baseResourceKey}.feedback.${baseResourcePropertiesKey}.content-placeholder`,
    FEEDBACK_SUBMIT: `${baseResourceKey}.feedback.${baseResourcePropertiesKey}.submit`,
    FEEDBACK_RATE_OUT_OF_5: `${baseResourceKey}.feedback.${baseResourcePropertiesKey}.rate-out-of-5`,
    /* ===== AI GENERATED CODE END ===== */

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