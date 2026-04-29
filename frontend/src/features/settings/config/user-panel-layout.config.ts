import type {ActionsItemId, MenuItem} from "@/shared/config";
import {LanguageIcon, SettingsIcon} from "@/shared/ui/icons";
import {LogoutIcon} from "@/shared/ui/icons";
import LightThemeIcon from "@/features/settings/ui/icons/LightThemeIcon.vue";

export type UserPanelLayout = {
    menuItems: MenuItem<ActionsItemId>[];
    baseKey: string;
}

export const USER_PANEL_LAYOUT: UserPanelLayout = {
    menuItems: [
        {
            id: "settings",
            routeName: "settings",
            labelKey: "settings",
            icon: SettingsIcon,
        },
        {
            id: "change-language",
            routeName: "settings",
            labelKey: "change-language",
            icon: LanguageIcon
        },
        {
            id: "change-theme",
            routeName: "settings",
            labelKey: "change-theme",
            icon: LightThemeIcon
        },
        {
            id: "logout",
            routeName: "logout",
            labelKey: "logout",
            icon: LogoutIcon,
        }
    ],
    baseKey: "actions"
};