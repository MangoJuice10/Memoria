import {
    type ActionsItemId,
    type MenuLayout, codes,
} from "@/shared/config";
import {LanguageIcon, SettingsIcon} from "@/shared/ui/icons";
import {LogoutIcon} from "@/shared/ui/icons";
import LightThemeIcon from "../ui/icons/LightThemeIcon.vue";

export const USER_PANEL_LAYOUT = {
    menuItems: [
        {
            id: "settings",
            labelCode: codes.USER_PANEL_SETTINGS,
            icon: SettingsIcon,
        },
        {
            id: "change-language",
            labelCode: codes.USER_PANEL_CHANGE_LANGUAGE,
            icon: LanguageIcon
        },
        {
            id: "change-theme",
            labelCode: codes.USER_PANEL_CHANGE_THEME,
            icon: LightThemeIcon
        },
        {
            id: "logout",
            labelCode: codes.USER_PANEL_LOGOUT,
            icon: LogoutIcon,
        }
    ],
    menuSections: [],
} as const satisfies MenuLayout<any, ActionsItemId>;