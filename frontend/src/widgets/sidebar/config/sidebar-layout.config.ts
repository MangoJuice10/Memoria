import {
    NAVIGATION_ITEMS,
    type MenuSection,
    type NavigationSectionId,
    type NavigationItemId
} from "@/shared/config";

export const baseNavigationItemKey = "navigation.sidebar.navigation-links";
export const baseNavigationSectionKey = "navigation.sidebar.sections";

export type SidebarLayout = {
    navigationSections: MenuSection<NavigationSectionId, NavigationItemId>[];
    baseKey: string;
}

export const SIDEBAR_GUEST_LAYOUT: SidebarLayout = {
    navigationSections: [
        {
            id: "features",
            labelKey: "features",
            menuItems: [
                NAVIGATION_ITEMS["feature-spaced-repetition"],
                NAVIGATION_ITEMS["feature-ai-assistance"],
                NAVIGATION_ITEMS["feature-trustworthy-answers"],
                NAVIGATION_ITEMS["feature-statistics"],
            ],
            baseKey: baseNavigationItemKey
        },
        {
            id: "about",
            labelKey: "about",
            menuItems: [
                NAVIGATION_ITEMS["about"],
            ],
            baseKey: baseNavigationItemKey
        },
    ],
    baseKey: baseNavigationSectionKey
};

export const SIDEBAR_AUTHENTICATED_LAYOUT: SidebarLayout = {
    navigationSections: [
        {
            id: "my-decks",
            labelKey: "my-decks",
            menuItems: [],
        }
    ],
    baseKey: baseNavigationSectionKey
};