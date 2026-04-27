import {
    initialLocale,
} from "@/shared/i18n";
import {Landing} from "@/pages/landing";
import {Login} from "@/pages/login";
import {Register} from "@/pages/register";
import MainLayout from "@/app/layouts/MainLayout.vue";

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
                name: "my-decks",
                component: Landing,
            },
            {
                path: "flashcards",
                name: "my-flashcards",
                component: Landing,
            },
            {
                path: "shared-decks",
                name: "shared-decks",
                component: Landing,
            },
            {
                path: "educational-resources",
                name: "my-educational-resources",
                component: Landing,
            },
        ]
    }
];
