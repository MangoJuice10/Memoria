import {createApp} from "vue";
import {createPinia} from "pinia";
import "@/app/styles/main.css";
import App from "@/app/App.vue";
import {router} from "@/app/router";
import {i18n} from "@/shared/i18n";
import {VueQueryPlugin} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api/queryClient.ts";
import {setupAuthInterceptors} from "@/shared/auth";
import {useViewerStore} from "@/entities/viewer";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(VueQueryPlugin, {queryClient});
app.use(router);
app.use(i18n);

setupAuthInterceptors();

const authStore = useViewerStore(pinia);
await authStore.initialize();

app.mount("#app");