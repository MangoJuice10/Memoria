import {NAVIGATION_ITEMS, type MenuItem, type NavigationItemId} from "@/shared/config";

const baseNavigationItemKey = "navigation.navbar.navigation-links";

export type NavbarLayout = {
    navigationItems: MenuItem<NavigationItemId>[],
    baseKey: string;
}

export const NAVBAR_GUEST_LAYOUT: NavbarLayout = {
    navigationItems: [NAVIGATION_ITEMS["feature-spaced-repetition"], NAVIGATION_ITEMS["feature-ai-assistance"], NAVIGATION_ITEMS["feature-trustworthy-answers"]],
    baseKey: baseNavigationItemKey,
};

export const NAVBAR_AUTHENTICATED_LAYOUT: NavbarLayout = {
    navigationItems: [NAVIGATION_ITEMS["my-decks"], NAVIGATION_ITEMS["shared-decks"], NAVIGATION_ITEMS["my-educational-resources"]],
    baseKey: baseNavigationItemKey
};