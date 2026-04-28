import {computed, inject, type Ref} from "vue";
import {useI18n} from "vue-i18n";
import {
    SIDEBAR_AUTHENTICATED_LAYOUT,
    SIDEBAR_GUEST_LAYOUT
} from "@/widgets/sidebar/config/sidebar-layout.config.ts";
import type {NavigationSectionView} from "@/shared/config";
import type {Controls} from "@/shared/model";

export function useSidebar(isAuthenticated: Ref<boolean>) {
    const {t} = useI18n();

    const navigationSectionViews = computed(() => {
        const sidebarLayout = isAuthenticated.value
            ? SIDEBAR_AUTHENTICATED_LAYOUT
            : SIDEBAR_GUEST_LAYOUT;

        return sidebarLayout.navigationSections.map(
            (navigationSection): NavigationSectionView => {
                const navigationItemViews = !isAuthenticated
                    ? []
                    : navigationSection.navigationItems.map(
                        (navigationItem) => {
                            const {labelKey, ...navigationProperties} = navigationItem;
                            return {
                                ...navigationProperties,
                                label: t(`${navigationSection.baseKey}.${labelKey}`)
                            };
                        }
                    );

                const {
                    labelKey,
                    navigationItems,
                    baseKey,
                    ...sectionProperties
                } = navigationSection;
                return {
                    ...sectionProperties,
                    navigationItemViews,
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