<script setup lang="ts">
import logomark from "@/assets/logo/logomark.svg";
import logotype from "@/assets/logo/logotype.svg";

withDefaults(defineProps<{
  hasLogomark?: boolean;
  logomarkClasses?: string;
  hasLogotype?: boolean;
  logotypeClasses?: string;
}>(), {
  hasLogomark: true,
  hasLogotype: false,
  logomarkClasses: "",
  logotypeClasses: ""
});
</script>

<template>
  <div class="flex items-center gap-[5%] h-full w-fit"
       data-testid="logo">
    <img v-if="hasLogomark" :src="logomark" alt=""
         class="h-full min-w-0 max-w-full max-h-full object-contain"
         :class="[logomarkClasses]"
         data-testid="logomark">
    <!--Space between the graphical and textual logo that scales with the logo-->
    <img v-if="hasLogotype" :src="logotype" alt=""
         class="block h-3/5 min-w-0 max-w-full max-h-3/5 object-contain"
         :class="[logotypeClasses]"
         data-testid="logotype">
  </div>
</template>