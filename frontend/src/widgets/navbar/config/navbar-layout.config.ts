import {NAVIGATION_ITEMS, type NavigationItem} from "@/shared/config";

const baseNavigationItemKey = "navigation.navbar.navLinks";

export type NavbarLayout = {
    navigationItems: NavigationItem[],
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