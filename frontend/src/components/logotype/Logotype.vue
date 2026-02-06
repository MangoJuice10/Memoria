<script setup lang="ts">
import logotypeGraphical from "@/assets/logotypes/logotypeGraphical.svg";
import logotypeText from "@/assets/logotypes/logotypeText.svg";

withDefaults(defineProps<{
  hasGraphicalLogotype?: boolean,
  hasTextualLogotype?: boolean,
}>(), {
  hasGraphicalLogotype: true,
  hasTextualLogotype: false
});
</script>

<template>
  <div class="flex items-center h-full w-fit"
       data-testid="logotype">
    <img v-if="hasGraphicalLogotype" :src="logotypeGraphical" alt="" class="h-full min-w-0 max-w-full max-h-full object-contain"
         data-testid="graphical-logotype">
    <!--Space between the graphical and textual logotypes that scales with the logotype-->
    <div v-if="hasGraphicalLogotype && hasTextualLogotype" class="hidden md:block shrink-0 w-[5%]"/>
    <img v-if="hasTextualLogotype" :src="logotypeText" alt="" class="hidden md:block h-3/5 min-w-0 max-w-full max-h-3/5 object-contain"
         data-testid="textual-logotype">
  </div>
</template>