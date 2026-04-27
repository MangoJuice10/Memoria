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

type NavigationItemId =
    | "feature-spaced-repetition"
    | "feature-ai-assistance"
    | "feature-trustworthy-answers"
    | "feature-statistics"
    | "my-flashcards"
    | "my-decks"
    | "shared-decks"
    | "my-educational-resources"
    | "about";

export type NavigationItem = {
    id: NavigationItemId;
    routeName: string;
    labelKey: string;
    icon?: Component;
}

export type NavigationItemView = Omit<NavigationItem, "labelKey"> & {
    label: string;
}

export type NavigationSectionId =
    | "features"
    | "introduction";

export type NavigationSection = {
    id: NavigationSectionId;
    labelKey: string;
    navigationItems: NavigationItem[];
    baseKey: string;
}

export type NavigationSectionView = Omit<NavigationSection, "labelKey" | "navigationItems" | "baseKey"> & {
    label: string;
    navigationItemViews: NavigationItemView[];
}

export const NAVIGATION_ITEMS: Record<NavigationItemId, NavigationItem> = {
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
    "about": {id: "about", routeName: "/about", labelKey: "about", icon: LogomarkIcon},
};
