import {createWebHistory, createRouter} from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import LoginPage from "@/views/LoginPage.vue";

import LogotypeTest from "@tests/e2e/views/LogotypeTest.vue";

const routes = [
    {path: "/", component: LandingPage},
    {path: "/login", component: LoginPage}
];

const testRoutes = [
    {path: "/test/logotype", component: LogotypeTest}
];

if (import.meta.env.DEV) routes.push(...testRoutes);

export const router = createRouter({
    history: createWebHistory(),
    routes,
});