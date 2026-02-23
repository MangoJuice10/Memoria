<script setup lang="ts">
import {useI18n} from "vue-i18n";
import Logo from "@/components/logo/Logo.vue";
import {useNavigation} from "@/composables/useNavigation";
import Navlink from "@/components/navigation/navbar/NavLink.vue";

const {t} = useI18n();
const navigation = useNavigation().getFooterNavigation();
</script>

<template>
  <footer class="w-footer px-footer py-footer">
    <Logo has-logotype class="h-12! mb-10"/>
    <div class="footer-content w-full mb-15">
      <section v-for="section in navigation" :key="section.id"
               class="flex flex-col justify-start items-start gap-4">
        <h3 v-text="section.heading" class="font-semibold"/>
        <nav class="flex flex-col items-start gap-3 w-fit">
          <Navlink v-for="navLink in section.navLinks" :key="navLink.id" :href="navLink.href"
                   class="grow-0 shrink-0 text-sm">
            <span v-text="navLink.label.value"/>
          </Navlink>
        </nav>
      </section>
    </div>
    <div v-text="t('footer.copyright')" class="text-muted"/>
  </footer>
</template>

<style scoped>
  .footer-content {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-row-gap: 2rem;
  }

  .footer-content > * {
    padding-left: 25%;
  }

  @media (max-width: calc(48rem - 1px)) {
    .footer-content > :nth-child(2n + 1) {
      padding-left: 0;
    }
  }

  @media (min-width: 48rem) {
    .footer-content {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-row-gap: 3rem;
    }

    .footer-content > :nth-child(3n + 1) {
      padding-left: 0;
    }
  }
</style>