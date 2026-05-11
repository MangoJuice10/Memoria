import type {MenuLayout, SettingsItemId} from "@/shared/config";
import {AccountIcon, LanguageIcon} from "@/shared/ui/icons";
import LightThemeIcon from "@/features/settings/ui/icons/LightThemeIcon.vue";

export const baseSettingsKey = "settings.navigation-links";

export const SETTINGS_LAYOUT = {
    menuItems: [
        {
            id: "profile",
            labelKey: "profile",
            icon: AccountIcon
        },
        {
            id: "theme",
            labelKey: "theme",
            icon: LightThemeIcon
        },
        {
            id: "language",
            labelKey: "language",
            icon: LanguageIcon
        }
    ],
    baseItemsKey: baseSettingsKey,
    menuSections: [],
    baseSectionsKey: ""
} as const satisfies MenuLayout<any, SettingsItemId>;