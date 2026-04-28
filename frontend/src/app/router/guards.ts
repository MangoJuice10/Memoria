import {
    type Locale,
    initialLocale,
    setLocale,
    loadLocaleMessages,
    isSupportedLocale
} from "@/shared/i18n";
import {setZodLocale, type ZodLocale} from "@/shared/zod";
import {useBackdrop} from "@/shared/lib/useBackdrop.ts";
import {useViewerStore} from "@/entities/viewer";
import type {Router} from "vue-router";

export function registerNavigationGuards(router: Router) {
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

        const authStore = useViewerStore();
        if (!authStore.isInitialized) {
            await authStore.initialize();
        }

        if (to.meta.public && authStore.isAuthenticated) {
            next({name: "home", params: {locale: newLocale}});
            return;
        }

        hideBackdrop();
        next();
    });
}