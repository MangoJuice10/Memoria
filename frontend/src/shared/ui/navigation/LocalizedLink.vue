<script setup lang="ts">
import {computed} from "vue";
import {getLocale, type Locale} from "@/shared/i18n";
import type {RouteLocationNamedRaw} from "vue-router";

const props = defineProps<{
  name: string;
  locale?: Locale;
}>();

const locale = computed<Locale>((): Locale => {
  if (props.locale) return props.locale;
  return getLocale();
});

const localizedURL = computed((): RouteLocationNamedRaw =>
    ({
      name: props.name,
      params: {
        locale: locale.value
      }
    })
);
</script>

<template>
  <RouterLink :to="localizedURL">
    <slot/>
  </RouterLink>
</template>