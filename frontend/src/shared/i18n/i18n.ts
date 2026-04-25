import {nextTick} from "vue";
import {createI18n} from "vue-i18n";
import enUS from "@/shared/i18n/locales/en-US.json";
import {pluralRulesRu} from "@/shared/i18n/plurals/pluralRulesRu.ts";

export type Locale = "en-US" | "ru-RU";
export type MessageSchema = typeof enUS;

export const supportedLocales = ["en-US", "ru-RU"] as const satisfies readonly Locale[];

export const isSupportedLocale = (value: unknown): value is Locale => {
    return typeof value === "string" && supportedLocales.includes(value as Locale);
};

const resolveInitialLocale = (defaultLocale: Locale): Locale => {
    const savedLocale = localStorage.getItem("locale");
    if (isSupportedLocale(savedLocale)) return savedLocale;

    const systemLocale = navigator.language;
    if (isSupportedLocale(systemLocale)) return systemLocale;

    const systemLanguage = systemLocale.split("-")[0];
    const localeByLanguage = supportedLocales.find((supportedLocale) => {
        const supportedLocaleLanguage = supportedLocale.split("-")[0];
        return supportedLocaleLanguage === systemLanguage;
    });
    if (localeByLanguage) return localeByLanguage;

    return defaultLocale;
};

export const initialLocale = resolveInitialLocale("en-US");

export const localesMeta = {
    "en-US": {
        name: "English"
    },
    "ru-RU": {
        name: "Русский"
    }
} satisfies Record<Locale, {
    [key: string]: unknown
}>;

export const i18n = createI18n<MessageSchema, Locale, false>({
    legacy: false,
    locale: initialLocale,
    fallbackLocale: "en-US",
    messages: {
        "en-US": {},
        "ru-RU": {}
    },
    pluralRules: {
        ru: pluralRulesRu
    }
});

export const t = i18n.global.t;

export const getLocale = (): Locale => {
    return i18n.global.locale.value;
};

export const setLocale = (locale: Locale) => {
    i18n.global.locale.value = locale;
};

export const loadLocaleMessages = async (locale: Locale) => {
    const messages = await import(`./locales/${locale}.json`);
    i18n.global.setLocaleMessage(locale, messages.default);
    return nextTick();
};