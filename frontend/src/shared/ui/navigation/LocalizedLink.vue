<script setup lang="ts">
import {computed} from "vue";
import {getLocale, type Locale} from "@/shared/i18n";
import {useBackdropStore, useSidebarStore} from "@/shared/model";
import type {RouteLocationNamedRaw} from "vue-router";

type RouteParams = {
  locale?: Locale
} & Record<string, string>;

const props = withDefaults(defineProps<{
  name: string;
  params?: RouteParams;
}>(), {
  params: () => ({})
});

const backdropStore = useBackdropStore();
const sidebarStore = useSidebarStore();

const locale = computed<Locale>((): Locale => {
  if (props.params.locale) return props.params.locale;
  return getLocale();
});

const localizedURL = computed((): RouteLocationNamedRaw =>
    ({
      name: props.name,
      params: {
        ...props.params,
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