<script setup lang="ts">
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import {isSupportedLocale, localesMeta, type Locale, initialLocale} from "@/shared/i18n";

const route = useRoute();
const router = useRouter();

const locale = computed<Locale>({
  get: () => {
    const routeParamLocale = route.params.locale;
    return isSupportedLocale(routeParamLocale) ? routeParamLocale : initialLocale;
  },
  set: async (value) => {
    if (route.params.locale === value) return;
    localStorage.setItem("locale", value);
    await router.push({
      name: route.name,
      params: {
        ...route.params,
        locale: value,
      },
      query: route.query,
      hash: route.hash,
    });
  }
});

const localeFlags: Record<Locale, string> = {
  "en-US": "🇺🇸",
  "ru-RU": "🇷🇺",
};

const locales = Object.entries(localesMeta) as [Locale, { name: string }][];

function selectLocale(value: Locale) {
  locale.value = value;
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <h2 class="text-2xl font-semibold">
      {{ $t("settings.navigation-links.language") }}
    </h2>

    <div class="flex flex-col gap-4">
      <p class="text-muted text-sm">
        {{ $t("settings.language.description") }}
      </p>

      <div class="flex flex-col gap-2">
        <button
            v-for="[localeKey, meta] in locales"
            :key="localeKey"
            @click="selectLocale(localeKey)"
            class="flex items-center gap-4 px-5 py-4 rounded-2xl border-2 cursor-pointer transition-all text-left"
            :class="locale === localeKey
              ? 'border-primary bg-secondary'
              : 'border-default bg-transparent hover:bg-hover'">
          <span class="text-2xl">{{ localeFlags[localeKey] }}</span>
          <span class="font-semibold">{{ meta.name }}</span>
          <span v-if="locale === localeKey"
                class="ml-auto text-xs text-muted font-medium">
            {{ $t("settings.language.active") }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
