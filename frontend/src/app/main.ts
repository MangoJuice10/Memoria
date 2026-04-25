import {createApp} from "vue";
import {createPinia} from "pinia";
import "@/app/styles/main.css";
import App from "@/app/App.vue";
import {router} from "@/app/router.ts";
import {i18n} from "@/shared/i18n/i18n.ts";
import {VueQueryPlugin} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api/queryClient.ts";
import {setupAuthInterceptors} from "@/features/auth/api/setup-auth-interceptors.ts";
import {useAuthStore} from "@/features/auth/model/auth.store.ts";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(VueQueryPlugin, {queryClient});
app.use(router);
app.use(i18n);

setupAuthInterceptors();

const authStore = useAuthStore(pinia);
await authStore.initializeAuth();

app.mount("#app");