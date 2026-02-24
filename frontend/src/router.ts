import {createWebHistory, createRouter} from "vue-router";
import {useOverlay} from "@/composables/useOverlay";
import LandingPage from "@/views/LandingPage.vue";
import LoginPage from "@/views/LoginPage.vue";

import LogoTest from "@tests/e2e/views/LogoTest.vue";
import LogoInAContainerTest from "@tests/e2e/views/LogoInAContainerTest.vue";

const routes = [
    {path: "/", component: LandingPage},
    {path: "/login", component: LoginPage}
];

const testRoutes = [
    {path: "/test/logo/", component: LogoTest},
    {path: "/test/logo/container", component: LogoInAContainerTest}
];

if (import.meta.env.DEV) routes.push(...testRoutes);

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

const {hideOverlay} = useOverlay();

router.beforeEach((_to, _from, next) => {
    hideOverlay();
    next();
});