import {
    type Locale,
    initialLocale,
    setLocale,
    loadLocaleMessages,
    isSupportedLocale, getLocale
} from "@/shared/i18n";
import {setZodLocale, type ZodLocale} from "@/shared/zod";
import {useViewerStore} from "@/entities/viewer";
import type {Router} from "vue-router";
import {useLoadingScreenStore} from "@/app/router/loading-screen.store.ts";

export function registerNavigationGuards(router: Router) {
    router.beforeEach(async () => {
        const {startLoading} = useLoadingScreenStore();
        startLoading();
    });

    router.afterEach(async () => {
        const {stopLoading} = useLoadingScreenStore();
        stopLoading();
    })

    router.beforeEach(async (to, _, next) => {
        const viewerStore = useViewerStore();

        if (!viewerStore.isInitialized) {
            await viewerStore.initialize();
        }

        if (to.meta.public && viewerStore.isAuthenticated) {
            next({name: "home", params: { locale: getLocale() }});
            return;
        }

        next();
    });

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

        next();
    });
}