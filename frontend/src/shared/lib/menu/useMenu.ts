import {computed, toValue, type MaybeRefOrGetter} from "vue";
import {type Composer} from "vue-i18n";
import type {
    MenuItemView,
    MenuLayout,
    MenuSectionView,
} from "@/shared/config";

export function useMenu<
    SectionId extends string | number,
    ItemId extends string | number,
>(
    getMenuLayout: MaybeRefOrGetter<MenuLayout<SectionId, ItemId>>,
    t: Composer["t"]
) {
    const menuItemViews = computed(() => {
        const menuLayout = toValue(getMenuLayout);
        return menuLayout.menuItems.map(
            (menuItem): MenuItemView<ItemId> => {
                const {labelKey, ...menuItemProperties} = menuItem;
                return {
                    ...menuItemProperties,
                    label: t(`${menuLayout.baseItemsKey}.${labelKey}`)
                };
            }
        );
    });

    const menuSectionViews = computed(() => {
        const menuLayout = toValue(getMenuLayout);
        return menuLayout.menuSections.map(
            (menuSection): MenuSectionView<SectionId, ItemId> => {
                const navigationItemViews = menuSection.menuItems.map(
                    (navigationItem) => {
                        const {labelKey, ...menuItemProperties} = navigationItem;
                        return {
                            ...menuItemProperties,
                            label: t(`${menuSection.baseItemsKey}.${labelKey}`)
                        };
                    }
                );

                const {labelKey, menuItems, baseItemsKey, ...sectionProperties} = menuSection;

                return {
                    ...sectionProperties,
                    menuItemViews: navigationItemViews,
                    label: t(`${menuLayout.baseSectionsKey}.${labelKey}`)
                };
            }
        );
    });

    return {
        menuItemViews,
        menuSectionViews,
    };
}