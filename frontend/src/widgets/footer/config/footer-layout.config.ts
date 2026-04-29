import {
    NAVIGATION_ITEMS,
    type MenuSection,
    type NavigationSectionId,
    type NavigationItemId
} from "@/shared/config";

export const baseNavigationItemKey = "navigation.footer.navigation-links";
export const baseNavigationSectionKey = "navigation.footer.sections";

export type FooterLayout = {
    navigationSections: MenuSection<NavigationSectionId, NavigationItemId>[]
    baseKey: string;
}

export const FOOTER_LAYOUT: FooterLayout = {
    navigationSections: [
        {
            id: "features",
            labelKey: "features",
            menuItems: [
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