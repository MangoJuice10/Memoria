import {NAVIGATION_ITEMS, type NavigationItem} from "@/shared/config";

export const baseNavbarKey = "navigation.navbar.navLinks";

export type NavbarLayout = {
    navigationItems: NavigationItem[],
    baseKey: string;
}

export const NAVBAR_GUEST_LAYOUT: NavbarLayout = {
    navigationItems: [NAVIGATION_ITEMS["spaced-repetition"], NAVIGATION_ITEMS["ai-assistance"], NAVIGATION_ITEMS["trustworthy-answers"]],
    baseKey: baseNavbarKey,
} as const;

export const NAVBAR_AUTHENTICATED_LAYOUT: NavbarLayout = {
    navigationItems: [NAVIGATION_ITEMS["my-decks"], NAVIGATION_ITEMS["shared-decks"], NAVIGATION_ITEMS["my-educational-resources"]],
    baseKey: baseNavbarKey
} as const;