import {
    NAVIGATION_ITEMS,
    type NavigationSectionId,
    type MenuLayout,
    type NavigationItemId
} from "@/shared/config";

export const baseNavigationItemKey = "navigation.footer.navigation-links";
export const baseNavigationSectionKey = "navigation.footer.sections";

export const FOOTER_LAYOUT = {
    menuItems: [],
    baseItemsKey: "",
    menuSections: [
        {
            id: "features",
            labelKey: "features",
            menuItems: [
                NAVIGATION_ITEMS["feature-spaced-repetition"],
                NAVIGATION_ITEMS["feature-ai-assistance"],
                NAVIGATION_ITEMS["feature-trustworthy-answers"],
                NAVIGATION_ITEMS["feature-statistics"]
            ],
            baseItemsKey: baseNavigationItemKey
        },
    ],
    baseSectionsKey: baseNavigationSectionKey,
} as const satisfies MenuLayout<NavigationSectionId, NavigationItemId>;