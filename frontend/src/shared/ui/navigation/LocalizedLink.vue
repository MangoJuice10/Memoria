<script setup lang="ts">
import {computed} from "vue";
import {getLocale, type Locale} from "@/shared/i18n";
import type {RouteLocationNamedRaw} from "vue-router";

const props = withDefaults(defineProps<{
  name: string;
  locale?: Locale;
}>(), {
  locale: getLocale(),
});

const localizedURL = computed((): RouteLocationNamedRaw =>
    ({
      name: props.name,
      params: {
        locale: props.locale
      }
    })
);
</script>

<template>
  <RouterLink :to="localizedURL">
    <slot/>
  </RouterLink>
</template>