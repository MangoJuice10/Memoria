<script setup lang="ts">
import {useTheme} from "../../lib/use-theme.ts";
import LightThemeIcon from "../icons/LightThemeIcon.vue";
import DarkThemeIcon from "../icons/DarkThemeIcon.vue";

const {theme, toggleTheme} = useTheme();
</script>

<template>
  <div class="flex flex-col gap-8">
    <h2 class="text-2xl font-semibold">
      {{ $t("settings.navigation-links.theme") }}
    </h2>

    <div class="flex flex-col gap-4">
      <p class="text-muted text-sm">
        {{ $t("settings.theme.description") }}
      </p>

      <div class="flex gap-4">
        <button
            @click="() => { if (theme !== 'light') toggleTheme(); }"
            class="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 cursor-pointer transition-all"
            :class="theme === 'light'
              ? 'border-primary bg-secondary'
              : 'border-default bg-transparent hover:bg-hover'">
          <LightThemeIcon class="icon-static w-10 aspect-square"/>
          <span class="font-semibold text-sm">
            {{ $t("settings.theme.light") }}
          </span>
        </button>

        <button
            @click="() => { if (theme !== 'dark') toggleTheme(); }"
            class="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 cursor-pointer transition-all"
            :class="theme === 'dark'
              ? 'border-primary bg-secondary'
              : 'border-default bg-transparent hover:bg-hover'">
          <DarkThemeIcon class="icon-static w-10 aspect-square"/>
          <span class="font-semibold text-sm">
            {{ $t("settings.theme.dark") }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
