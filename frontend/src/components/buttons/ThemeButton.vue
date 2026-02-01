<script setup lang="ts">
import {ref, watch, onMounted} from "vue";
import type {Theme} from "@/types/Theme.ts";
import LightThemeIcon from "@/components/icons/themes/LightThemeIcon.vue";
import DarkThemeIcon from "@/components/icons/themes/DarkThemeIcon.vue";

const theme = ref<Theme>(
    (localStorage.getItem("theme") as Theme) ??
    (window.matchMedia("prefers-color-scheme: light").matches
        ? "light"
        : "dark")
);
const isHovered = ref(false);

const applyTheme = (value: Theme) => {
  document.documentElement.classList.toggle("dark", value === "dark");
}

onMounted(() => {
  applyTheme(theme.value);
})

watch(theme, (value) => {
  localStorage.setItem("theme", value);
  applyTheme(value);
})

const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
}
</script>

<template>
  <button @click="toggleTheme" @mouseenter="isHovered = true" @mouseleave="isHovered = false"
       class="group flex justify-center align-center aspect-square rounded-full border border-border cursor-pointer">
    <LightThemeIcon v-if="theme === 'light'" :class="[!isHovered ? 'icon' : 'icon-inverse', 'scale-80']"/>
    <DarkThemeIcon v-if="theme === 'dark'" :class="[!isHovered ? 'icon' : 'icon-inverse', 'scale-80']"/>
  </button>
</template>