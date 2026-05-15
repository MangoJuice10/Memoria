import {type MenuLayout, settingsCodes, type SettingsItemId} from "@/shared/config";
import {AccountIcon, LanguageIcon} from "@/shared/ui/icons";
import LightThemeIcon from "../ui/icons/LightThemeIcon.vue";

export const SETTINGS_LAYOUT = {
    menuItems: [
        {
            id: "profile",
            labelCode: settingsCodes.SETTINGS_PROFILE,
            icon: AccountIcon
        },
        {
            id: "theme",
            labelCode: settingsCodes.SETTINGS_THEME,
            icon: LightThemeIcon
        },
        {
            id: "language",
            labelCode: settingsCodes.SETTINGS_LANGUAGE,
            icon: LanguageIcon
        }
    ],
    menuSections: [],
} as const satisfies MenuLayout<any, SettingsItemId>;