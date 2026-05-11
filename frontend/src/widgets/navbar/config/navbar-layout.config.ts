import {
    NAVIGATION_ITEMS,
    type NavigationItemId,
    type MenuLayout,
} from "@/shared/config";

const baseNavigationItemKey = "navigation.navbar.navigation-links";

export const NAVBAR_GUEST_LAYOUT = {
    menuItems: [
        NAVIGATION_ITEMS["feature-spaced-repetition"],
        NAVIGATION_ITEMS["feature-ai-assistance"],
        NAVIGATION_ITEMS["feature-trustworthy-answers"]
    ],
    baseItemsKey: baseNavigationItemKey,
    menuSections: [],
    baseSectionsKey: "",
} as const satisfies MenuLayout<any, NavigationItemId>;

export const NAVBAR_AUTHENTICATED_LAYOUT = {
    menuItems: [
        NAVIGATION_ITEMS["decks"],
        NAVIGATION_ITEMS["shared-decks"],
        NAVIGATION_ITEMS["educational-resources"]
    ],
    baseItemsKey: baseNavigationItemKey,
    menuSections: [],
    baseSectionsKey: "",
} as const satisfies MenuLayout<any, NavigationItemId>;