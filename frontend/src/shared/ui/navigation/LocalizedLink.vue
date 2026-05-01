<script setup lang="ts">
import {computed} from "vue";
import {getLocale, type Locale} from "@/shared/i18n";
import {useBackdropStore, useSidebarStore} from "@/shared/model";
import type {RouteLocationNamedRaw} from "vue-router";

const props = defineProps<{
  name: string;
  locale?: Locale;
}>();

const backdropStore = useBackdropStore();
const sidebarStore = useSidebarStore();

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

function handleClick() {
  backdropStore.hide();
  sidebarStore.hide();
}
</script>

<template>
  <RouterLink :to="localizedURL"
              @click="handleClick">
    <slot/>
  </RouterLink>
</template>