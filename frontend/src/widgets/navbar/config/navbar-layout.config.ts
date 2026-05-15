import {
    type NavigationItemId,
    type MenuLayout, menuCodes,
} from "@/shared/config";

import {
    AIAssistanceIcon,
    DecksIntroductionIcon,
    EducationalResourcesIntroductionIcon,
    SharedDecksIntroductionIcon,
    SpacedRepetitionFeatureIcon,
    TrustworthyAnswersFeatureIcon
} from "@/shared/ui/icons";

export const NAVBAR_GUEST_LAYOUT = {
    menuItems: [
        {
            id: "feature-spaced-repetition",
            routeName: "feature-spaced-repetition",
            labelCode: menuCodes.NAVBAR_ITEM_FEATURE_SPACED_REPETITION,
            icon: SpacedRepetitionFeatureIcon
        },
        {
            id: "feature-ai-assistance",
            routeName: "feature-ai-assistance",
            labelCode: menuCodes.NAVBAR_ITEM_FEATURE_AI_ASSISTANCE,
            icon: AIAssistanceIcon
        },
        {
            id: "feature-trustworthy-answers",
            routeName: "feature-trustworthy-answers",
            labelCode: menuCodes.NAVBAR_ITEM_FEATURE_TRUSTWORTHY_ANSWERS,
            icon: TrustworthyAnswersFeatureIcon
        },
    ],
    menuSections: [],
} as const satisfies MenuLayout<any, NavigationItemId>;

export const NAVBAR_AUTHENTICATED_LAYOUT = {
    menuItems: [
        {
            id: "decks",
            routeName: "decks",
            labelCode: menuCodes.NAVBAR_ITEM_DECKS,
            icon: DecksIntroductionIcon
        },
        {
            id: "shared-decks",
            routeName: "shared-decks",
            labelCode: menuCodes.NAVBAR_ITEM_SHARED_DECKS,
            icon: SharedDecksIntroductionIcon
        },
        {
            id: "educational-resources",
            routeName: "educational-resources",
            labelCode: menuCodes.NAVBAR_ITEM_EDUCATIONAL_RESOURCES,
            icon: EducationalResourcesIntroductionIcon
        },
    ],
    menuSections: [],
} as const satisfies MenuLayout<any, NavigationItemId>;