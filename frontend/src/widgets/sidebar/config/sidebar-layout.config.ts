import {
    NAVIGATION_ITEMS,
    type NavigationSectionId,
    type MenuLayout,
    type NavigationItemId
} from "@/shared/config";

export const baseNavigationItemKey = "navigation.sidebar.navigation-links";
export const baseNavigationSectionKey = "navigation.sidebar.sections";

export const SIDEBAR_GUEST_LAYOUT = {
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
                NAVIGATION_ITEMS["feature-statistics"],
            ],
            baseItemsKey: baseNavigationItemKey
        },
        {
            id: "about",
            labelKey: "about",
            menuItems: [
                NAVIGATION_ITEMS["about"],
            ],
            baseItemsKey: baseNavigationItemKey
        },
    ],
    baseSectionsKey: baseNavigationSectionKey,
} as const satisfies MenuLayout<NavigationSectionId, NavigationItemId>;

/*
export const SIDEBAR_AUTHENTICATED_LAYOUT = {
    hasSections: true,
    menuSections: [
        {
            id: "decks",
            labelKey: "decks",
            menuItems: [],
        }
    ],
    baseKey: baseNavigationSectionKey
} as const satisfies MenuLayout<NavigationSectionId, any>;
*/
