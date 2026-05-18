import {
    codes,
    type FooterSectionId,
    type MenuLayout,
    type FooterItemId
} from "@/shared/config";

export const FOOTER_LAYOUT = {
    menuItems: [],
    menuSections: [
        {
            id: "features",
            labelCode: codes.FOOTER_SECTION_FEATURES,
            menuItems: [
                {
                    id: "feature-spaced-repetition",
                    routeName: "feature-spaced-repetition",
                    labelCode: codes.FOOTER_ITEM_FEATURE_SPACED_REPETITION,
                },
                {
                    id: "feature-ai-assistance",
                    routeName: "feature-ai-assistance",
                    labelCode: codes.FOOTER_ITEM_FEATURE_AI_ASSISTANCE,
                },
                {
                    id: "feature-trustworthy-answers",
                    routeName: "feature-trustworthy-answers",
                    labelCode: codes.FOOTER_ITEM_FEATURE_TRUSTWORTHY_ANSWERS,
                },
                {
                    id: "feature-statistics",
                    routeName: "feature-statistics",
                    labelCode: codes.FOOTER_ITEM_FEATURE_STATISTICS,
                },
            ],
        },
    ],
} as const satisfies MenuLayout<FooterSectionId, FooterItemId>;