import {NAVIGATION_ITEMS, type NavigationSection} from "@/shared/config";

export const baseNavigationItemKey = "navigation.footer.navLinks";
export const baseNavigationSectionKey = "navigation.footer.sections";

export type FooterLayout = {
    navigationSections: NavigationSection[]
    baseKey: string;
}

export const FOOTER_LAYOUT: FooterLayout = {
    navigationSections: [
        {
            id: "features",
            labelKey: "features",
            navigationItems: [
                NAVIGATION_ITEMS["feature-spaced-repetition"],
                NAVIGATION_ITEMS["feature-ai-assistance"],
                NAVIGATION_ITEMS["feature-trustworthy-answers"],
                NAVIGATION_ITEMS["feature-statistics"]
            ],
            baseKey: baseNavigationItemKey
        },
    ],
    baseKey: baseNavigationSectionKey,
};