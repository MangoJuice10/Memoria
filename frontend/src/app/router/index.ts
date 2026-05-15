import {createWebHistory, createRouter} from "vue-router";
import {routes} from "@/app/router/routes";
import {registerNavigationGuards} from "@/app/router/guards.ts";

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

registerNavigationGuards(router);

export {getIdRouteParam} from "./get-id-route-param.ts";

export {default as LoadingScreen} from "./LoadingScreen.vue";