import {
    codes,
    type SidebarSectionId,
    type MenuLayout,
    type SidebarItemId
} from "@/shared/config";
import {
    AIAssistanceIcon,
    LogomarkIcon,
    SpacedRepetitionFeatureIcon,
    StatisticsFeatureIcon,
    TrustworthyAnswersFeatureIcon
} from "@/shared/ui";

export const SIDEBAR_GUEST_LAYOUT = {
    menuItems: [],
    menuSections: [
        {
            id: "features",
            labelCode: codes.SIDEBAR_SECTION_FEATURES,
            menuItems: [
                {
                    id: "feature-spaced-repetition",
                    routeName: "feature-spaced-repetition",
                    labelCode: codes.SIDEBAR_ITEM_FEATURE_SPACED_REPETITION,
                    icon: SpacedRepetitionFeatureIcon
                },
                {
                    id: "feature-ai-assistance",
                    routeName: "feature-ai-assistance",
                    labelCode: codes.SIDEBAR_ITEM_FEATURE_AI_ASSISTANCE,
                    icon: AIAssistanceIcon
                },
                {
                    id: "feature-trustworthy-answers",
                    routeName: "feature-trustworthy-answers",
                    labelCode: codes.SIDEBAR_ITEM_FEATURE_TRUSTWORTHY_ANSWERS,
                    icon: TrustworthyAnswersFeatureIcon
                },
                {
                    id: "feature-statistics",
                    routeName: "feature-statistics",
                    labelCode: codes.SIDEBAR_ITEM_FEATURE_STATISTICS,
                    icon: StatisticsFeatureIcon
                },
            ],
        },
        {
            id: "about",
            labelCode: codes.SIDEBAR_SECTION_ABOUT,
            menuItems: [
                {
                    id: "about",
                    routeName: "about",
                    labelCode: codes.SIDEBAR_ITEM_ABOUT,
                    icon: LogomarkIcon
                },
            ],
        },
    ],
} as const satisfies MenuLayout<SidebarSectionId, SidebarItemId>;