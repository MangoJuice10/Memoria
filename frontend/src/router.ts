import {createWebHistory, createRouter} from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import LoginPage from "@/views/LoginPage.vue";

import LogotypeComponentTest from "@tests/e2e/views/LogotypeTest.vue";
import LogotypeComponentInAContainerTest from "@tests/e2e/views/LogotypeInAContainerTest.vue";

const routes = [
    {path: "/", component: LandingPage},
    {path: "/login", component: LoginPage}
];

const testRoutes = [
    {path: "/test/logotype/", component: LogotypeComponentTest},
    {path: "/test/logotype/container", component: LogotypeComponentInAContainerTest}
];

if (import.meta.env.DEV) routes.push(...testRoutes);

export const router = createRouter({
    history: createWebHistory(),
    routes,
});