import {
    type NavigationSectionId,
    type MenuLayout,
    type NavigationItemId, menuCodes
} from "@/shared/config";
import {
    AIAssistanceIcon,
    SpacedRepetitionFeatureIcon, StatisticsFeatureIcon,
    TrustworthyAnswersFeatureIcon
} from "@/shared/ui";

export const FOOTER_LAYOUT = {
    menuItems: [],
    menuSections: [
        {
            id: "features",
            labelCode: menuCodes.FOOTER_SECTION_FEATURES,
            menuItems: [
                {
                    id: "feature-spaced-repetition",
                    routeName: "feature-spaced-repetition",
                    labelCode: menuCodes.FOOTER_ITEM_FEATURE_SPACED_REPETITION,
                    icon: SpacedRepetitionFeatureIcon
                },
                {
                    id: "feature-ai-assistance",
                    routeName: "feature-ai-assistance",
                    labelCode: menuCodes.FOOTER_ITEM_FEATURE_AI_ASSISTANCE,
                    icon: AIAssistanceIcon
                },
                {
                    id: "feature-trustworthy-answers",
                    routeName: "feature-trustworthy-answers",
                    labelCode: menuCodes.FOOTER_ITEM_FEATURE_TRUSTWORTHY_ANSWERS,
                    icon: TrustworthyAnswersFeatureIcon
                },
                {
                    id: "feature-statistics",
                    routeName: "feature-statistics",
                    labelCode: menuCodes.FOOTER_ITEM_FEATURE_STATISTICS,
                    icon: StatisticsFeatureIcon
                },
            ],
        },
    ],
} as const satisfies MenuLayout<NavigationSectionId, NavigationItemId>;