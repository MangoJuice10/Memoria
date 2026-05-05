import {useI18n} from "vue-i18n";
import {computed} from "vue";
import {SETTINGS_LAYOUT} from "../config/settings-layout.config.ts";
import type {MenuItemView, SettingsItemId} from "@/shared/config";

export function useSettings() {
    const {t} = useI18n();

    const settingsItems = computed(() => {
        const settingsLayout = SETTINGS_LAYOUT;
        return settingsLayout.menuItems.map(
            (menuItem): MenuItemView<SettingsItemId> => {
                const {labelKey, ...menuItemProperties} = menuItem;
                return {
                    ...menuItemProperties,
                    label: t(`${settingsLayout.baseKey}.${labelKey}`),
                }
            }
        )
    });

    return {
        settingsItems
    }
}