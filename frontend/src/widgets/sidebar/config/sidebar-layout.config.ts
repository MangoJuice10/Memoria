import {NAVIGATION_ITEMS, type NavigationSection} from "@/shared/config";

export const baseNavigationItemKey = "navigation.sidebar.navLinks";
export const baseNavigationSectionKey = "navigation.sidebar.sections";

export type SidebarLayout = {
    navigationSections: NavigationSection[];
    baseKey: string;
}

export const SIDEBAR_GUEST_LAYOUT: SidebarLayout = {
    navigationSections: [
        {
            id: "features",
            labelKey: "features",
            navigationItems: [
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
            navigationItems: [
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
            navigationItems: [],
        }
    ],
    baseKey: baseNavigationSectionKey
};