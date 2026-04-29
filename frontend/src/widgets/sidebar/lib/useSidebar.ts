import {computed, inject, type Ref} from "vue";
import {useI18n} from "vue-i18n";
import {
    SIDEBAR_AUTHENTICATED_LAYOUT,
    SIDEBAR_GUEST_LAYOUT
} from "@/widgets/sidebar/config/sidebar-layout.config.ts";
import type {MenuSectionView, NavigationItemId, NavigationSectionId} from "@/shared/config";
import type {Controls} from "@/shared/model";

export function useSidebar(isAuthenticated: Ref<boolean>) {
    const {t} = useI18n();

    const navigationSectionViews = computed(() => {
        const sidebarLayout = isAuthenticated.value
            ? SIDEBAR_AUTHENTICATED_LAYOUT
            : SIDEBAR_GUEST_LAYOUT;

        return sidebarLayout.navigationSections.map(
            (navigationSection): MenuSectionView<NavigationSectionId, NavigationItemId> => {
                const navigationItemViews = !isAuthenticated
                    ? []
                    : navigationSection.menuItems.map(
                        (navigationItem) => {
                            const {labelKey, ...menuItemProperties} = navigationItem;
                            return {
                                ...menuItemProperties,
                                label: t(`${navigationSection.baseKey}.${labelKey}`)
                            };
                        }
                    );

                const {
                    labelKey,
                    menuItems,
                    baseKey,
                    ...sectionProperties
                } = navigationSection;

                return {
                    ...sectionProperties,
                    menuItemViews: navigationItemViews,
                    label: t(`${sidebarLayout.baseKey}.${labelKey}`)
                };
            }
        );
    });
    const controls = inject<Controls>("sidebar");
    if (!controls) throw new Error("Sidebar Controls were not provided");

    return {
        navigationSectionViews,
        controls
    };
}