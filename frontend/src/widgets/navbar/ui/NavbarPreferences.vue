<script setup lang="ts">
import LanguageSelect from "@/features/user-preferences/change-language/ui/LanguageSelect.vue";
import ThemeSwitcher from "@/features/user-preferences/change-theme/ui/ThemeSwitcher.vue";
</script>

<template>
  <div class="inline-flex justify-between items-center gap-3 lg:gap-5">
    <LanguageSelect class="font-semibold" selected-language-classes="max-sm:hidden md:max-xl:hidden"
                    arrow-classes="md:max-lg:hidden"/>
    <ThemeSwitcher class="w-10"/>
  </div>
</template>