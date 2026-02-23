import {createI18n} from "vue-i18n";
import languageCodes from "@/constants/languageCodes";
import type {LanguageCode} from "@/types/LanguageCode.ts";
import type {LanguageMeta} from "@/types/LanguageMeta";

const systemLocale = navigator.language;
const systemLanguage = systemLocale.split("-")[0] ?? "en";

const language = localStorage.getItem("language") ?? systemLanguage;

export const i18n = createI18n({
    legacy: false,
    locale: language,
    fallbackLocale: "en",
    messages: languageCodes,
});

export const languageMeta: Record<LanguageCode, LanguageMeta> = {
    en: {
        name: "English",
    },
    ru: {
        name: "Русский",
    }
};