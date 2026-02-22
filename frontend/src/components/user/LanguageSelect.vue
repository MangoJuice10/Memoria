<script setup lang="ts">
import {useI18n} from "vue-i18n";
import type {LanguageCode} from "@/types/LanguageCode.ts";
import {getLangName} from "@/utils/language";
import LangIcon from "@/components/icons/user/LanguageIcon.vue";
import ArrowIcon from "@/components/icons/utils/ArrowIcon.vue";
import Select from "@/components/form/select/Select.vue";
import SelectOption from "@/components/form/select/SelectOption.vue";

withDefaults(defineProps<{
  selectedLanguageClasses?: string;
  arrowClasses?: string;
}>(), {
  selectedLanguageClasses: "",
  arrowClasses: "",
});
const {locale} = useI18n();
</script>

<template>
  <Select v-model="locale">
    <template v-slot:label>
      <div class="flex justify-center items-center gap-2">
        <LangIcon class="icon-static w-7.5 aspect-square"/>
        <span v-text="getLangName(locale as LanguageCode)" :class="[selectedLanguageClasses]"/>
        <ArrowIcon class="icon-static w-4 aspect-square rotate-90" :class="[arrowClasses]"/>
      </div>
    </template>
    <SelectOption optionValue="en">English</SelectOption>
    <SelectOption optionValue="ru">Русский</SelectOption>
  </Select>
</template>