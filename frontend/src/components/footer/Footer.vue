<script setup lang="ts">
import {useI18n} from "vue-i18n";
import Logotype from "@/components/logotype/Logotype.vue";

const {t, tm} = useI18n();
</script>

<template>
  <div class="flex flex-col justify-start gap-12.5 px-25 py-12.5">
    <div class="flex items-start gap-100 w-full">
      <Logotype/>
      <div class="flex justify-between gap-50 w-full">
        <div v-for="section in tm('footer.sections')" :key="section.name"
             class="flex flex-col justify-start items-start gap-1">
          <div v-text="section.title" class="font-semibold"/>
          <div v-for="(link, i) in section.links" :key="i" v-text="link"/>
        </div>
      </div>
    </div>
    <div v-text="t('footer.copyright')"/>
  </div>
</template>

