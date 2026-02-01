import {createI18n} from "vue-i18n";
import languageCodes from "@/constants/languageCodes";
import type {LanguageCode} from "@/types/LanguageCode.ts";
import type {LanguageMeta} from "@/types/LanguageMeta";

export const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: languageCodes,
});

export const languageMeta = {
    en: {
        name: "English",
    },
    ru: {
        name: "Русский",
    }
} as const satisfies Record<LanguageCode, LanguageMeta>;