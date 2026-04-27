<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useFooter} from "@/widgets/footer/lib/useFooter.ts";
import FooterSections from "@/widgets/footer/ui/FooterSections.vue";
import Logo from "@/shared/ui/logo/Logo.vue";
import {LocalizedLink} from "@/shared/ui";

const {t} = useI18n();
const {navigationSectionViews} = useFooter();
</script>

<template>
  <footer class="w-footer px-footer py-footer">
    <LocalizedLink name="home" class="block h-12 mb-10 min-w-0 max-w-full max-h-full">
      <Logo has-logotype/>
    </LocalizedLink>
    <FooterSections :navigation-section-views/>
    <div v-text="t('navigation.footer.copyright')" class="text-muted"/>
  </footer>
</template>