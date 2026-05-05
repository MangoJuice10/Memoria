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
    baseKey: "actions"
};