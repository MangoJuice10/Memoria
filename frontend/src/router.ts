import {createMemoryHistory, createRouter} from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import LoginPage from "@/views/LoginPage.vue";

const routes = [
    {path: "/", component: LandingPage},
    {path: "/login", component: LoginPage}
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
});