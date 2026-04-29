import type {Component} from "vue";
import {
    AIAssistanceIcon,
    DecksIntroductionIcon,
    EducationalResourcesIntroductionIcon,
    FlashcardsIntroductionIcon,
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
    | "my-flashcards"
    | "my-decks"
    | "shared-decks"
    | "my-educational-resources"
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

export type MenuItem<Item extends string | number> = {
    id: Item;
    routeName: string;
    callback?: () => void | Promise<void>;
    labelKey: string;
    icon?: Component;
}

export type MenuItemView<Item extends string | number> = Omit<MenuItem<Item>, "labelKey"> & {
    label: string;
}

export type NavigationSectionId =
    | "features"
    | "about"
    | "my-decks";

export type MenuSection<Section extends string | number, Item extends string | number> = {
    id: Section;
    labelKey: string;
    menuItems: MenuItem<Item>[];
    baseKey?: string;
}

export type MenuSectionView<Section extends string | number, Item extends string | number> =
    Omit<MenuSection<Section, Item>, "labelKey" | "menuItems" | "baseKey"> & {
    label: string;
    menuItemViews: MenuItemView<Item>[];
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
    "my-flashcards": {
        id: "my-flashcards",
        routeName: "my-flashcards",
        labelKey: "my-flashcards",
        icon: FlashcardsIntroductionIcon
    },
    "my-decks": {
        id: "my-decks",
        routeName: "my-decks",
        labelKey: "my-decks",
        icon: DecksIntroductionIcon
    },
    "my-educational-resources": {
        id: "my-educational-resources",
        routeName: "my-educational-resources",
        labelKey: "my-educational-resources",
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
