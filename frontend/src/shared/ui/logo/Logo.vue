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
  <div class="group flex items-center gap-[5%] h-full w-fit"
       data-testid="logo">
    <div class="block h-full min-w-0 max-w-full max-h-full">
      <img v-if="hasLogomark" :src="logomark" alt=""
           class="h-full w-full object-contain
                  transition-transform duration-800 group-hover:rotate-360"
           :class="[logomarkClasses]"
           data-testid="logomark">
    </div>
    <!--Space between the graphical and textual logo that scales with the logo-->
    <img v-if="hasLogotype" :src="logotype" alt=""
         class="block h-3/5 min-w-0 max-w-full max-h-3/5 object-contain
                transition-all duration-500 group-hover:animate-[logotype_1s_ease-out] group-hover:opacity-90"
         :class="[logotypeClasses]"
         data-testid="logotype">
  </div>
</template>

<style>
@keyframes logotype {
  0% {
    transform: translateY(0);
    opacity: 0.7;
  }

  /* max allowed displacement */
  12% {
    transform: translateY(-8px);
  }

  24% {
    transform: translateY(5.5px);
  }

  /* decaying oscillation */
  36% {
    transform: translateY(-4.5px);
  }

  48% {
    transform: translateY(3.2px);
  }

  60% {
    transform: translateY(-2.4px);
  }

  72% {
    transform: translateY(1.6px);
  }

  84% {
    transform: translateY(-0.9px);
  }

  92% {
    transform: translateY(0.4px);
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>