import {
    type ActionsItemId,
    type MenuLayout,
} from "@/shared/config";
import {LanguageIcon, SettingsIcon} from "@/shared/ui/icons";
import {LogoutIcon} from "@/shared/ui/icons";
import LightThemeIcon from "@/features/settings/ui/icons/LightThemeIcon.vue";

export const USER_PANEL_LAYOUT = {
    menuItems: [
        {
            id: "settings",
            labelKey: "settings",
            icon: SettingsIcon,
        },
        {
            id: "change-language",
            labelKey: "change-language",
            icon: LanguageIcon
        },
        {
            id: "change-theme",
            labelKey: "change-theme",
            icon: LightThemeIcon
        },
        {
            id: "logout",
            labelKey: "logout",
            icon: LogoutIcon,
        }
    ],
    baseItemsKey: "actions",
    menuSections: [],
    baseSectionsKey: ""
} as const satisfies MenuLayout<any, ActionsItemId>;