import {computed, type Ref} from "vue";
import {useI18n} from "vue-i18n";
import {
    NAVBAR_AUTHENTICATED_LAYOUT,
    NAVBAR_GUEST_LAYOUT
} from "../config/navbar-layout.config.ts";
import type {MenuItemView, NavigationItemId} from "@/shared/config";


export function useNavbar(isAuthenticated: Ref<boolean>) {
    const {t} = useI18n();

    const navigationItemViews = computed(() => {
        const navbarLayout = isAuthenticated.value
            ? NAVBAR_AUTHENTICATED_LAYOUT
            : NAVBAR_GUEST_LAYOUT;

        return navbarLayout.navigationItems.map(
            (navigationItem): MenuItemView<NavigationItemId> => {
                const {labelKey, ...menuItemProperties} = navigationItem;
                return {
                    ...menuItemProperties,
                    label: t(`${navbarLayout.baseKey}.${labelKey}`)
                };
            }
        );
    });

    return {
        navigationItemViews,
    };
}