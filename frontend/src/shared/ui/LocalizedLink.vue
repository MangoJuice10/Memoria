<script setup lang="ts">
import {computed} from "vue";
import {getLocale} from "@/shared/i18n/i18n.ts";

const props = defineProps<{
  to: string;
}>();

const localizedURL = computed(() =>
    props.to === "/"
        ? `/${getLocale()}`
        : `/${getLocale()}${props.to}`
);
</script>

<template>
  <RouterLink :to="localizedURL">
    <slot/>
  </RouterLink>
</template>