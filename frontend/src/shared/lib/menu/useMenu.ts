import {computed, toValue, type MaybeRefOrGetter} from "vue";
import {type Composer} from "vue-i18n";
import type {
    MenuItemView,
    MenuLayout,
    MenuSectionView,
} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

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
                const {labelCode, labelOptions, ...menuItemProperties} = menuItem;
                return {
                    ...menuItemProperties,
                    label: t(codeToKey(labelCode), {
                        ...labelOptions
                    })
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
                        const {labelCode, labelOptions, ...menuItemProperties} = navigationItem;
                        return {
                            ...menuItemProperties,
                            label: t(codeToKey(labelCode), {
                                ...labelOptions
                            })
                        };
                    }
                );

                const {labelCode, labelOptions, menuItems, ...sectionProperties} = menuSection;

                return {
                    ...sectionProperties,
                    menuItemViews: navigationItemViews,
                    label: t(codeToKey(labelCode), {
                        ...labelOptions
                    })
                };
            }
        );
    });

    return {
        menuItemViews,
        menuSectionViews,
    };
}