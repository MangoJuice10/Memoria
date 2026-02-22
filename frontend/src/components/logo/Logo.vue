<script setup lang="ts">
import NavLink from "@/components/navigation/navbar/NavLink.vue";
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
    <NavLink href="/" class="block h-full min-w-0 max-w-full max-h-full">
      <img v-if="hasLogomark" :src="logomark" alt=""
           class="h-full w-full object-contain
                hover:scale-105"
           :class="[logomarkClasses]"
           data-testid="logomark">
    </NavLink>
    <!--Space between the graphical and textual logo that scales with the logo-->
    <img v-if="hasLogotype" :src="logotype" alt=""
         class="block h-3/5 min-w-0 max-w-full max-h-3/5 object-contain"
         :class="[logotypeClasses]"
         data-testid="logotype">
  </div>
</template>