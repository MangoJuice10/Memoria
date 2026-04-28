import {computed, inject, type Ref} from "vue";
import {useI18n} from "vue-i18n";
import {
    NAVBAR_AUTHENTICATED_LAYOUT,
    NAVBAR_GUEST_LAYOUT
} from "@/widgets/navbar/config/navbar-layout.config.ts";
import type {NavigationItemView} from "@/shared/config";
import type {Controls} from "@/shared/model";

export function useNavbar(isAuthenticated: Ref<boolean>) {
    const {t} = useI18n();

    const navigationItemViews = computed(() => {
        const navbarLayout = isAuthenticated.value
            ? NAVBAR_AUTHENTICATED_LAYOUT
            : NAVBAR_GUEST_LAYOUT;

        return navbarLayout.navigationItems.map(
            (navigationItem): NavigationItemView => {
                const {labelKey, ...navigationProperties} = navigationItem;
                return {
                    ...navigationProperties,
                    label: t(`${navbarLayout.baseKey}.${navigationItem.labelKey}`)
                };
            }
        );
    });

    const sidebarControls = inject<Controls>("sidebar");
    if (!sidebarControls) throw new Error("Sidebar Controls were not provided");

    return {
        navigationItemViews,
        sidebarControls
    };
}