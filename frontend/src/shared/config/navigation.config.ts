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
    | "spaced-repetition"
    | "ai-assistance"
    | "trustworthy-answers"
    | "statistics"
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

export const NAVIGATION_ITEMS: Record<NavigationItemId, NavigationItem> = {
    "spaced-repetition": {
        id: "spaced-repetition",
        routeName: "spaced-repetition",
        labelKey: "spaced-repetition",
        icon: SpacedRepetitionFeatureIcon
    },
    "ai-assistance": {
        id: "ai-assistance",
        routeName: "ai-assistance",
        labelKey: "ai-assistance",
        icon: AIAssistanceIcon
    },
    "trustworthy-answers": {
        id: "trustworthy-answers",
        routeName: "trustworthy-answers",
        labelKey: "trustworthy-answers",
        icon: TrustworthyAnswersFeatureIcon
    },
    "statistics": {
        id: "statistics",
        routeName: "statistics",
        labelKey: "statistics",
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
