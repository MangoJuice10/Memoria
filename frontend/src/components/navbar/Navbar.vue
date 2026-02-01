<script setup lang="ts">
import type {Component} from "vue";
import {useI18n} from "vue-i18n";
import SpacedRepetitionIcon from "@/components/icons/spacedRepetition/SpacedRepetitionIcon.vue";
import AIAssistanceIcon from "@/components/icons/ai/AIAssistanceIcon.vue";
import TrustworthyAnswersIcon from "@/components/icons/educationalResources/TrustworthyAnswersIcon.vue";
import Button from "@/components/form/Button.vue";
import IconText from "@/components/utils/IconText.vue";
import Logotype from "@/components/logotype/Logotype.vue";
import ThemeButton from "@/components/buttons/ThemeButton.vue";
import NavLink from "@/components/navbar/NavLink.vue";
import LanguageSelect from "@/components/user/LanguageSelect.vue";
import {useAuthStore} from "@/stores/auth";
import AccountIcon from "@/components/icons/user/AccountIcon.vue";

const {t} = useI18n();
const auth = useAuthStore();

const navlinks: {
  key: string;
  path: string;
  translationKey: string;
  icon: Component;
}[] = [
  {
    key: "spaced-repetition",
    path: "/",
    translationKey: "navbar.spacedRepetition",
    icon: SpacedRepetitionIcon
  },
  {
    key: "ai-assistance",
    path: "/",
    translationKey: "navbar.aiAssistance",
    icon: AIAssistanceIcon,
  },
  {
    key: "trustworthy-answers",
    path: "/",
    translationKey: "navbar.trustworthyAnswers",
    icon: TrustworthyAnswersIcon
  }
];

</script>

<template>
  <nav v-if="!auth.isAuthenticated" class="flex justify-between items-stretch fixed w-full h-16 px-25 border-b border-b-border bg-primary">
    <div class="flex justify-center items-center">
      <Logotype class="h-13.5"/>
    </div>
    <div class="flex justify-between items-center gap-5">
      <NavLink v-for="navlink in navlinks" :key="navlink.key" :path="navlink.path" class="font-semibold">
        <IconText :text="t(navlink.translationKey)">
          <component :is="navlink.icon" class="w-7.5"/>
        </IconText>
      </NavLink>
    </div>
    <div class="flex justify-between items-center gap-7.5">
      <LanguageSelect class="w-37.5 h-full font-semibold"/>
      <ThemeButton class="w-10"/>
      <div class="flex justify-between items-center gap-2.5">
        <AccountIcon class="icon-dynamic w-10"/>
        <RouterLink to="/login">
          <Button class="font-semibold">
            {{ t("auth.login.action") }}
          </Button>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style>
</style>