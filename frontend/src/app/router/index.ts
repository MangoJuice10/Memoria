import {createWebHistory, createRouter} from "vue-router";
import {routes} from "@/app/router/routes";
import {registerNavigationGuards} from "@/app/router/guards.ts";

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

registerNavigationGuards(router);