<script setup lang="ts">
import {useI18n} from "vue-i18n";
import type {LanguageCode} from "@/types/LanguageCode.ts";
import {getLangName} from "@/utils/language";
import LangIcon from "@/components/icons/user/LanguageIcon.vue";
import ArrowIcon from "@/components/icons/utils/ArrowIcon.vue";
import Select from "@/components/form/select/Select.vue";
import SelectOption from "@/components/form/select/SelectOption.vue";

const {locale} = useI18n();
</script>

<template>
  <Select v-model="locale">
    <template v-slot:label>
      <div class="flex justify-center items-center gap-1.25">
        <LangIcon class="icon w-7.5 aspect-square"/>
        <span v-text="getLangName(locale as LanguageCode)" class="hidden md:inline"/>
        <ArrowIcon class="icon w-4 aspect-square"/>
      </div>
    </template>
    <SelectOption optionValue="en">English</SelectOption>
    <SelectOption optionValue="ru">Русский</SelectOption>
  </Select>
</template>