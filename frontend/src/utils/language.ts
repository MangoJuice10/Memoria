import type {LanguageCode} from "@/types/LanguageCode";
import {languageMeta} from "@/i18n";

export const getLangName = (langCode: LanguageCode): string => languageMeta[langCode].name;