<script setup lang="ts">
import {useTheme} from "../lib/useTheme";
import LightThemeIcon from "./icons/LightThemeIcon.vue";
import DarkThemeIcon from "./icons/DarkThemeIcon.vue";

const {theme, toggleTheme} = useTheme();

</script>

<template>
  <button @click="toggleTheme"
          class="group flex justify-center align-center rounded-full border border-default cursor-pointer">
    <LightThemeIcon v-if="theme === 'light'" class="icon-static scale-80"/>
    <DarkThemeIcon v-if="theme === 'dark'" class="icon-static scale-80"/>
  </button>
</template>

<style scoped>
.icon-static:hover {
  --color-icon-default: var(--color-gray-1400);
  --color-icon-inverse: var(--color-gray-0);
}
</style>