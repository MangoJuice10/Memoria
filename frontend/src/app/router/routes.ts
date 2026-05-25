import {
    initialLocale,
} from "@/shared/i18n";
import type {RouteLocationGeneric} from "vue-router";
import {MainLayout} from "@/app/layouts";
import {Landing} from "@/pages/landing";
import {Login} from "@/pages/login";
import {Register} from "@/pages/register";
import {Decks, Deck, DeckInfoTab, EducationalResourcesTab} from "@/pages/decks";
import {FlashcardsTab} from "@/pages/decks";
import {Review} from "@/pages/review";
import {EducationalResources} from "@/pages/educational-resources";
import {FeatureSpacedRepetition} from "@/pages/feature-spaced-repetition";
import {FeatureAIAssistance} from "@/pages/feature-ai-assistance";
import {FeatureTrustworthyAnswers} from "@/pages/feature-trustworthy-answers";
import {FeatureStatistics} from "@/pages/feature-statistics";
import {About} from "@/pages/about";

export const routes = [
    {
        path: "/",
        redirect: `/${initialLocale}`
    },
    {
        path: "/:locale",
        component: MainLayout,
        children: [
            {
                path: "",
                name: "home",
                component: Landing
            },
            {
                path: "about",
                name: "about",
                component: About,
                meta: {public: true}
            },
            {
                path: "login",
                name: "login",
                component: Login,
                meta: {public: true}
            },
            {
                path: "register",
                name: "register",
                component: Register,
                meta: {public: true}
            },
            {
                path: "feature-spaced-repetition",
                name: "feature-spaced-repetition",
                component: FeatureSpacedRepetition,
                meta: {public: true}
            },
            {
                path: "feature-ai-assistance",
                name: "feature-ai-assistance",
                component: FeatureAIAssistance,
                meta: {public: true}
            },
            {
                path: "feature-trustworthy-answers",
                name: "feature-trustworthy-answers",
                component: FeatureTrustworthyAnswers,
                meta: {public: true}
            },
            {
                path: "feature-statistics",
                name: "feature-statistics",
                component: FeatureStatistics,
                meta: {public: true}
            },
            {
                path: "decks",
                name: "decks",
                component: Decks,
            },
            {
                path: "decks/:deckId",
                name: "deck",
                component: Deck,
                redirect: (to: RouteLocationGeneric) => ({
                    name: "deck-flashcards",
                    params: {
                        ...to.params
                    }
                }),
                children: [
                    {
                        path: "info",
                        name: "deck-info",
                        component: DeckInfoTab
                    },
                    {
                        path: "flashcards",
                        name: "deck-flashcards",
                        component: FlashcardsTab
                    },
                    {
                        path: "educational-resources",
                        name: "deck-educational-resources",
                        component: EducationalResourcesTab
                    }
                ]
            },
            {
                path: "decks/:deckId/review",
                name: "review",
                component: Review
            },
            {
                path: "shared-decks",
                name: "shared-decks",
                component: Landing,
            },
            {
                path: "educational-resources",
                name: "educational-resources",
                component: EducationalResources,
            },
        ]
    }
];
