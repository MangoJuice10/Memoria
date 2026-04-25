<script setup lang="ts">
import {computed, watch} from "vue";
import {Select} from "@/shared/ui/select";
import {SelectOption} from "@/shared/ui/select";
import {initialLocale, isSupportedLocale, localesMeta, type Locale} from "@/shared/i18n";
import {LanguageIcon} from "@/shared/ui/icons";
import {ArrowIcon} from "@/shared/ui/icons";
import {useRoute, useRouter} from "vue-router";

withDefaults(defineProps<{
  selectedLanguageClasses?: string;
  arrowClasses?: string;
}>(), {
  selectedLanguageClasses: "",
  arrowClasses: "",
});

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
    });
  }
});

const localeName = computed(() => localesMeta[locale.value].name);

watch(locale, (value: string) => {
  localStorage.setItem("locale", value);
});
</script>

<template>
  <Select v-model="locale">
    <template v-slot:label>
      <div class="flex justify-center items-center gap-2">
        <LanguageIcon class="icon-static w-7.5 aspect-square"/>
        <span :class="[selectedLanguageClasses]">
          {{ localeName }}
        </span>
        <ArrowIcon class="icon-static w-4 aspect-square rotate-90" :class="[arrowClasses]"/>
      </div>
    </template>
    <SelectOption optionValue="en-US">English</SelectOption>
    <SelectOption optionValue="ru-RU">Русский</SelectOption>
  </Select>
</template>