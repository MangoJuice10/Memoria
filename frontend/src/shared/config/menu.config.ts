import type {Component} from "vue";
import {
    AIAssistanceIcon,
    DecksIntroductionIcon,
    EducationalResourcesIntroductionIcon,
    LogomarkIcon,
    SharedDecksIntroductionIcon,
    SpacedRepetitionFeatureIcon,
    StatisticsFeatureIcon,
    TrustworthyAnswersFeatureIcon
} from "@/shared/ui/icons";

export type NavigationItemId =
    | "feature-spaced-repetition"
    | "feature-ai-assistance"
    | "feature-trustworthy-answers"
    | "feature-statistics"
    | "decks"
    | "shared-decks"
    | "educational-resources"
    | "about";

export type ActionsItemId =
    | "settings"
    | "change-language"
    | "change-theme"
    | "logout";

export type SettingsItemId =
    | "profile"
    | "language"
    | "theme";

export type OptionsItemId =
    | "edit"
    | "delete";

export type MenuItem<ItemId extends string | number> = {
    id: ItemId;
    routeName?: string;
    callback?: () => void | Promise<void>;
    labelKey: string;
    icon?: Component;
}

export type MenuItemView<ItemId extends string | number> = Omit<MenuItem<ItemId>, "labelKey"> & {
    label: string;
}

export type NavigationSectionId =
    | "features"
    | "about"
    | "decks";

export type MenuSection<SectionId extends string | number, ItemId extends string | number> = {
    id: SectionId;
    labelKey: string;
    menuItems: MenuItem<ItemId>[];
    baseItemsKey: string;
}

export type MenuSectionView<SectionId extends string | number, ItemId extends string | number> =
    Omit<MenuSection<SectionId, ItemId>, "labelKey" | "menuItems" | "baseItemsKey"> & {
    label: string;
    menuItemViews: MenuItemView<ItemId>[];
}

export type MenuLayout<SectionId extends string | number, ItemId extends string | number> = {
    menuItems: MenuItem<ItemId>[];
    baseItemsKey: string;
    menuSections: MenuSection<SectionId, ItemId>[];
    baseSectionsKey: string;
}

export const NAVIGATION_ITEMS: Record<NavigationItemId, MenuItem<NavigationItemId>> = {
    "feature-spaced-repetition": {
        id: "feature-spaced-repetition",
        routeName: "feature-spaced-repetition",
        labelKey: "feature-spaced-repetition",
        icon: SpacedRepetitionFeatureIcon
    },
    "feature-ai-assistance": {
        id: "feature-ai-assistance",
        routeName: "feature-ai-assistance",
        labelKey: "feature-ai-assistance",
        icon: AIAssistanceIcon
    },
    "feature-trustworthy-answers": {
        id: "feature-trustworthy-answers",
        routeName: "feature-trustworthy-answers",
        labelKey: "feature-trustworthy-answers",
        icon: TrustworthyAnswersFeatureIcon
    },
    "feature-statistics": {
        id: "feature-statistics",
        routeName: "feature-statistics",
        labelKey: "feature-statistics",
        icon: StatisticsFeatureIcon
    },
    "decks": {
        id: "decks",
        routeName: "decks",
        labelKey: "decks",
        icon: DecksIntroductionIcon
    },
    "educational-resources": {
        id: "educational-resources",
        routeName: "educational-resources",
        labelKey: "educational-resources",
        icon: EducationalResourcesIntroductionIcon
    },
    "shared-decks": {
        id: "shared-decks",
        routeName: "shared-decks",
        labelKey: "shared-decks",
        icon: SharedDecksIntroductionIcon
    },
    "about": {id: "about", routeName: "about", labelKey: "about", icon: LogomarkIcon},
};