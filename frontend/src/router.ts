import {createMemoryHistory, createRouter} from "vue-router";
import LandingPage from "@/components/landing/LandingPage.vue";
import LoginPage from "@/components/auth/login/LoginPage.vue";

const routes = [
    {path: "/", component: LandingPage},
    {path: "/login", component: LoginPage}
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
});