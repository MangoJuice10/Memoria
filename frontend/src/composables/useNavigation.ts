import {computed, type Component, type ComputedRef} from "vue";
import {useI18n} from "vue-i18n";
import SpacedRepetitionFeatureIcon from "@/components/icons/spacedRepetition/SpacedRepetitionFeatureIcon.vue";
import AIAssistanceIcon from "@/components/icons/ai/AIAssistanceIcon.vue";
import TrustworthyAnswersFeatureIcon from "@/components/icons/educationalResources/TrustworthyAnswersFeatureIcon.vue";
import StatisticsFeatureIcon from "@/components/icons/statistics/StatisticsFeatureIcon.vue";
import FlashcardsIntroductionIcon from "@/components/icons/spacedRepetition/FlashcardsIntroductionIcon.vue";
import DecksIntroductionIcon from "@/components/icons/spacedRepetition/DecksIntroductionIcon.vue";
import SharedDecksIntroductionIcon from "@/components/icons/spacedRepetition/SharedDecksIntroductionIcon.vue";
import EducationalResourcesIntroductionIcon
    from "@/components/icons/educationalResources/EducationalResourcesIntroductionIcon.vue";
import LogomarkIcon from "@/components/icons/memoria/LogomarkIcon.vue";

type NavLink = {
    label: ComputedRef;
    href: string;
    icon: Component;
}

type NavLinkItem = NavLink & {
    id: string;
}

// TODO: navlinks should differ based on whether the user is logged in or not
export function useNavigation() {
    const {t} = useI18n();
    const navbarNavigation: NavLinkItem[] = [
        {
            id: "spaced-repetition",
            href: "/spaced-repetition",
            label: computed(() => t("navigation.navbar.navLinks.spacedRepetition")),
            icon: SpacedRepetitionFeatureIcon,
        },
        {
            id: "ai-assistance",
            href: "/ai-assistance",
            label: computed(() => t("navigation.navbar.navLinks.aiAssistance")),
            icon: AIAssistanceIcon,
        },
        {
            id: "trustworthy-answers",
            href: "/trustworthy-answers",
            label: computed(() => t("navigation.navbar.navLinks.trustworthyAnswers")),
            icon: TrustworthyAnswersFeatureIcon,
        }
    ];

    const sidebarNavigation: {
        id: string;
        heading: string;
        navLinks: NavLinkItem[];
    }[] = [
        {
            id: "Features",
            heading: t("navigation.sidebar.sections.features.heading"),
            navLinks: [
                {
                    id: "spaced-repetition",
                    href: "/spaced-repetition",
                    label: computed(() => t("navigation.sidebar.sections.features.navLinks.spacedRepetition")),
                    icon: SpacedRepetitionFeatureIcon,
                },
                {
                    id: "ai-assistance",
                    href: "/ai-assistance",
                    label: computed(() => t("navigation.sidebar.sections.features.navLinks.aiAssistance")),
                    icon: AIAssistanceIcon,
                },
                {
                    id: "trustworthy-answers",
                    href: "/trustworthy-answers",
                    label: computed(() => t("navigation.sidebar.sections.features.navLinks.trustworthyAnswers")),
                    icon: TrustworthyAnswersFeatureIcon,
                },
                {
                    id: "statistics",
                    href: "/statistics",
                    label: computed(() => t("navigation.sidebar.sections.features.navLinks.statistics")),
                    icon: StatisticsFeatureIcon,
                }
            ]
        },
        {
            id: "Introduction",
            heading: t("navigation.sidebar.sections.introduction.heading"),
            navLinks: [
                {
                    id: "flashcards",
                    href: "/flashcards",
                    label: computed(() => t("navigation.sidebar.sections.introduction.navLinks.flashcards")),
                    icon: FlashcardsIntroductionIcon,
                },
                {
                    id: "decks",
                    href: "/decks",
                    label: computed(() => t("navigation.sidebar.sections.introduction.navLinks.decks")),
                    icon: DecksIntroductionIcon,
                },
                {
                    id: "decks",
                    href: "/shared-decks",
                    label: computed(() => t("navigation.sidebar.sections.introduction.navLinks.sharedDecks")),
                    icon: SharedDecksIntroductionIcon,
                },
                {
                    id: "educational-resources",
                    href: "/educational-resources",
                    label: computed(() => t("navigation.sidebar.sections.introduction.navLinks.educationalResources")),
                    icon: EducationalResourcesIntroductionIcon,
                },
            ]
        },
        {
            id: "about",
            heading: t("navigation.sidebar.sections.about.heading"),
            navLinks: [
                {
                    id: "memoria",
                    href: "/about",
                    label: computed(() => t("navigation.sidebar.sections.about.navLinks.memoria")),
                    icon: LogomarkIcon
                }
            ]
        }
    ];

    const footerNavigation: {
        id: string,
        heading: string,
        navLinks: NavLinkItem[],
    }[] = [
        {
            id: "Features",
            heading: t("footer.sections.features.heading"),
            navLinks: [
                {
                    id: "spaced-repetition",
                    href: "/spaced-repetition",
                    label: computed(() => t("footer.sections.features.navLinks.spacedRepetition")),
                    icon: SpacedRepetitionFeatureIcon,
                },
                {
                    id: "ai-assistance",
                    href: "/ai-assistance",
                    label: computed(() => t("footer.sections.features.navLinks.aiAssistance")),
                    icon: AIAssistanceIcon,
                },
                {
                    id: "trustworthy-answers",
                    href: "/trustworthy-answers",
                    label: computed(() => t("footer.sections.features.navLinks.trustworthyAnswers")),
                    icon: TrustworthyAnswersFeatureIcon,
                },
                {
                    id: "statistics",
                    href: "/statistics",
                    label: computed(() => t("footer.sections.features.navLinks.statistics")),
                    icon: StatisticsFeatureIcon,
                }
            ]
        },
        {
            id: "Introduction",
            heading: t("footer.sections.introduction.heading"),
            navLinks: [
                {
                    id: "flashcards",
                    href: "/flashcards",
                    label: computed(() => t("footer.sections.introduction.navLinks.flashcards")),
                    icon: FlashcardsIntroductionIcon,
                },
                {
                    id: "decks",
                    href: "/decks",
                    label: computed(() => t("footer.sections.introduction.navLinks.decks")),
                    icon: DecksIntroductionIcon,
                },
                {
                    id: "decks",
                    href: "/shared-decks",
                    label: computed(() => t("footer.sections.introduction.navLinks.sharedDecks")),
                    icon: SharedDecksIntroductionIcon,
                },
                {
                    id: "educational-resources",
                    href: "/educational-resources",
                    label: computed(() => t("footer.sections.introduction.navLinks.educationalResources")),
                    icon: EducationalResourcesIntroductionIcon,
                },
            ]
        }
    ];

    const getNavbarNavigation = () => {
        return navbarNavigation;
    };

    const getSidebarNavigation = () => {
        return sidebarNavigation;
    };

    const getFooterNavigation = () => {
        return footerNavigation;
    }

    return {
        getNavbarNavigation,
        getSidebarNavigation,
        getFooterNavigation,
    };
}