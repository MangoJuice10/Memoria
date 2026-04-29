import {useI18n} from "vue-i18n";
import {
    FOOTER_LAYOUT,
} from "@/widgets/footer/config/footer-layout.config";
import {computed} from "vue";
import type {
    MenuItemView,
    NavigationItemId,
    MenuSectionView,
    NavigationSectionId
} from "@/shared/config";

export function useFooter() {
    const {t} = useI18n();

    const navigationSectionViews = computed(() => {
        const footerLayout = FOOTER_LAYOUT;

        return footerLayout.navigationSections.map(
            (footerSection): MenuSectionView<NavigationSectionId, NavigationItemId> => {
                const navigationItemViews = footerSection.menuItems.map(
                    (navigationItem): MenuItemView<NavigationItemId> => {
                        const {labelKey, icon, ...menuItemProperties} = navigationItem;
                        return {
                            ...menuItemProperties,
                            label: t(`${footerSection.baseKey}.${labelKey}`)
                        };
                    }
                );

                const {labelKey, menuItems, baseKey, ...sectionProperties} = footerSection;
                return {
                    ...sectionProperties,
                    menuItemViews: navigationItemViews,
                    label: t(`${footerLayout.baseKey}.${labelKey}`)
                };
            }
        );
    });

    return {
        navigationSectionViews,
    };
}