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
                component: Landing,
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
                component: Landing,
                meta: {public: true}
            },
            {
                path: "feature-ai-assistance",
                name: "feature-ai-assistance",
                component: Landing,
                meta: {public: true}
            },
            {
                path: "feature-trustworthy-answers",
                name: "feature-trustworthy-answers",
                component: Landing,
                meta: {public: true}
            },
            {
                path: "feature-statistics",
                name: "feature-statistics",
                component: Landing,
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
