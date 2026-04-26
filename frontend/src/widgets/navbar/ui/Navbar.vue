<script setup lang="ts">
import {useRoute} from "vue-router";
import {useI18n} from "vue-i18n";
import {useNavigation} from "@/shared/lib/useNavigation.ts";
import Button from "@/shared/ui/Button.vue";
import IconLabel from "@/shared/ui/IconLabel.vue";
import Logo from "@/shared/ui/logo/Logo.vue";
import SidebarToggle from "@/widgets/sidebar/ui/SidebarToggle.vue";
import ThemeSwitcher from "@/features/change-theme/ui/ThemeSwitcher.vue";
import NavLink from "@/widgets/navbar/ui/NavLink.vue";
import LanguageSelect from "@/features/change-language/ui/LanguageSelect.vue";
import {useViewerStore} from "@/entities/viewer";
import LocalizedLink from "@/shared/ui/LocalizedLink.vue";

const route = useRoute();
const {t} = useI18n();
const auth = useViewerStore();
const navLinks = useNavigation().getNavbarNavigation();
</script>

<template>
  <header v-if="!auth.isAuthenticated"
          class="flex justify-between items-stretch gap-[3%] w-navbar h-navbar px-navbar border-b border-b-border bg-primary">
    <div class="shrink-0 inline-flex justify-center items-center gap-1">
      <SidebarToggle class=""/>
      <NavLink to="/" class="block h-full min-w-0 max-w-full max-h-full">
        <Logo has-logotype logotype-classes="max-lg:hidden" class="py-2"/>
      </NavLink>
    </div>
    <nav
        class="hidden md:inline-grid md:grid-flow-col md:auto-cols-fr md:justify-center md:items-center md:gap-5 md:w-fit">
      <NavLink v-for="navLink in navLinks" :key="navLink.id" :to="navLink.href"
               class="inline-flex justify-center items-center w-full px-2 py-1.5
               font-semibold border rounded-xl"
               :class="[route.path === navLink.href ?
               'border-landing text-inverse bg-secondary' :
               'border-transparent text-landing hover:border-landing hover:bg-hover']">
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
    <div class="inline-flex justify-between items-center gap-3 lg:gap-5">
      <LanguageSelect class="font-semibold" selected-language-classes="max-sm:hidden md:max-xl:hidden"
                      arrow-classes="md:max-lg:hidden"/>
      <ThemeSwitcher class="w-10"/>
      <LocalizedLink to="/login">
        <Button class="font-semibold">
          <span v-text="t('auth.login.action')"/>
        </Button>
      </LocalizedLink>
    </div>
  </header>
</template>