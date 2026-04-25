import {createWebHistory, createRouter} from "vue-router";
import {
    type Locale,
    initialLocale,
    setLocale,
    loadLocaleMessages,
    isSupportedLocale
} from "@/shared/i18n";
import {setZodLocale, type ZodLocale} from "@/shared/zod";
import {useBackdrop} from "@/shared/lib/useBackdrop.ts";
import {Landing} from "@/pages/landing";
import {Login} from "@/pages/login";
import {Register} from "@/pages/register";
import MainLayout from "@/app/layouts/MainLayout.vue";
import {useAuthStore} from "@/features/auth/model/auth.store.ts";

const routes = [
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
                meta: {guestOnly: true}
            },
            {
                path: "register",
                name: "register",
                component: Register,
                meta: {guestOnly: true}
            }
        ]
    }
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

const {hideBackdrop} = useBackdrop();

router.beforeEach(async (to, from, next) => {
    const [newLocale, oldLocale] = [to.params.locale, from.params.locale];
    if (!isSupportedLocale(newLocale)) {
        next(`/${initialLocale}`);
        return;
    }

    if (newLocale !== oldLocale) {
        await loadLocaleMessages(newLocale as Locale);
        setLocale(newLocale as Locale);

        const zodLocale = newLocale.split("-")[0];
        await setZodLocale(zodLocale as ZodLocale);
    }

    const authStore = useAuthStore();

    if (!authStore.isInitialized) {
        await authStore.initializeAuth();
    }

    if (to.meta.guestOnly && authStore.isAuthenticated) {
        next({name: "home", params: {locale: newLocale}});
    }

    hideBackdrop();
    next();
});