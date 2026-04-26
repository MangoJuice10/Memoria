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
            }
        ]
    }
];
