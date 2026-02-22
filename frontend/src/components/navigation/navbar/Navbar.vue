<script setup lang="ts">
import {useRoute} from "vue-router";
import {useI18n} from "vue-i18n";
import {useNavigation} from "@/composables/useNavigation.ts";
import Button from "@/components/form/Button.vue";
import IconLabel from "@/components/utils/IconLabel.vue";
import Logo from "@/components/logo/Logo.vue";
import SidebarToggle from "@/components/navigation/sidebar/SidebarToggle.vue";
import ThemeButton from "@/components/buttons/ThemeButton.vue";
import NavLink from "@/components/navigation/navbar/NavLink.vue";
import LanguageSelect from "@/components/user/LanguageSelect.vue";
import {useAuthStore} from "@/stores/auth.ts";

const route = useRoute();
const {t} = useI18n();
const auth = useAuthStore();
const navLinks = useNavigation().getNavbarNavigation();
</script>

<template>
  <header v-if="!auth.isAuthenticated"
          class="flex justify-between items-stretch gap-[3%] w-navbar h-navbar px-navbar border-b border-b-border bg-primary">
    <div class="shrink-0 inline-flex justify-center items-center gap-1">
      <SidebarToggle class=""/>
      <Logo has-logotype logotype-classes="max-lg:hidden" class="py-2"/>
    </div>
    <nav
        class="hidden md:inline-grid md:grid-flow-col md:auto-cols-fr md:justify-center md:items-center md:gap-5 md:w-fit">
      <NavLink v-for="navLink in navLinks" :key="navLink.id" :href="navLink.href"
               class="inline-flex justify-center items-center w-full px-2 py-1.5
               font-semibold border rounded-xl"
               :class="[route.path === navLink.href ?
               'border-default text-inverse bg-secondary' :
               'border-transparent text-default hover:border-default hover:bg-hover']">
        <IconLabel class="w-full">
          <template #icon>
            <component :is="navLink.icon" class="w-7.5"/>
          </template>
          <template #label>
            <div v-text="navLink.label.value"
                 class="inline-block h-[2lh] content-center truncate text-wrap"/>
          </template>
        </IconLabel>
      </NavLink>
    </nav>
    <div class="inline-flex justify-between items-center gap-3">
      <LanguageSelect class="font-semibold" selected-language-classes="md:max-xl:hidden" arrow-classes="md:max-lg:hidden"/>
      <ThemeButton class="w-10"/>
      <RouterLink to="/login">
        <Button class="font-semibold">
          <span v-text="t('auth.login.action')"/>
        </Button>
      </RouterLink>
    </div>
  </header>
</template>