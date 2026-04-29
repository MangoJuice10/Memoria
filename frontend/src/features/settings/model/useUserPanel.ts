import {USER_PANEL_LAYOUT} from "../config/user-panel-layout.config";
import type {ActionsItemId, MenuItemView} from "@/shared/config";
import {useI18n} from "vue-i18n";

export function useUserPanel() {
    const {t} = useI18n();

    const userPanelItemViews = USER_PANEL_LAYOUT.menuItems.map(
        (menuItem): MenuItemView<ActionsItemId> => {
            const {labelKey, ...menuItemProperties} = menuItem;
            return {
                ...menuItemProperties,
                label: t(`${USER_PANEL_LAYOUT.baseKey}.${labelKey}`)
            }
        }
    );

    return {
        userPanelItemViews
    }
}