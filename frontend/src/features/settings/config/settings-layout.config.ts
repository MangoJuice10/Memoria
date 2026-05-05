import type {MenuItem, SettingsItemId} from "@/shared/config";
import {AccountIcon, LanguageIcon} from "@/shared/ui/icons";
import LightThemeIcon from "@/features/settings/ui/icons/LightThemeIcon.vue";

export const baseSettingsKey = "settings.navigation-links";

export type SettingsLayout = {
    menuItems: MenuItem<SettingsItemId>[],
    baseKey: string
}

export const SETTINGS_LAYOUT: SettingsLayout = {
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
    baseKey: baseSettingsKey
};