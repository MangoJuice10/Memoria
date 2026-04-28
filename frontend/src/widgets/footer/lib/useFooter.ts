import {useI18n} from "vue-i18n";
import {
    FOOTER_LAYOUT,
} from "@/widgets/footer/config/footer-layout.config";
import {computed} from "vue";
import type {NavigationItemView, NavigationSectionView} from "@/shared/config";

export function useFooter() {
    const {t} = useI18n();

    const navigationSectionViews = computed(() => {
        const footerLayout = FOOTER_LAYOUT;

        return footerLayout.navigationSections.map(
            (footerSection): NavigationSectionView => {
                const navigationItemViews = footerSection.navigationItems.map(
                    (navigationItem): NavigationItemView => {
                        const {labelKey, icon, ...navigationProperties} = navigationItem;
                        return {
                            ...navigationProperties,
                            label: t(`${footerSection.baseKey}.${labelKey}`)
                        };
                    }
                );

                const {labelKey, navigationItems, baseKey, ...sectionProperties} = footerSection;
                return {
                    ...sectionProperties,
                    navigationItemViews,
                    label: t(`${footerLayout.baseKey}.${labelKey}`)
                };
            }
        );
    });

    return {
        navigationSectionViews,
    };
}