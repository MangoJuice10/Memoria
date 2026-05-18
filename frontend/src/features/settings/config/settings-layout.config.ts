import {type MenuLayout, codes, type SettingsItemId} from "@/shared/config";
import {AccountIcon, LanguageIcon} from "@/shared/ui/icons";
import LightThemeIcon from "../ui/icons/LightThemeIcon.vue";

export const SETTINGS_LAYOUT = {
    menuItems: [
        {
            id: "profile",
            labelCode: codes.SETTINGS_PROFILE,
            icon: AccountIcon
        },
        {
            id: "theme",
            labelCode: codes.SETTINGS_THEME,
            icon: LightThemeIcon
        },
        {
            id: "language",
            labelCode: codes.SETTINGS_LANGUAGE,
            icon: LanguageIcon
        }
    ],
    menuSections: [],
} as const satisfies MenuLayout<any, SettingsItemId>;