<script setup lang="ts">
import {useI18n} from "vue-i18n";
import Logo from "@/components/logo/Logo.vue";
import {useNavigation} from "@/composables/useNavigation";
import Navlink from "@/components/navigation/navbar/NavLink.vue";

const {t} = useI18n();
const navigation = useNavigation().getFooterNavigation();
</script>

<template>
  <footer class="flex flex-col justify-start gap-20 w-footer h-footer px-footer py-footerd">
    <div class="flex items-start gap-100 w-full">
      <Logo has-logotype class="h-20!"/>
      <div class="flex justify-between gap-50 w-full">
        <section v-for="section in navigation" :key="section.id"
                 class="flex flex-col justify-start items-start gap-4">
          <h3 v-text="section.heading" class="font-semibold"/>
          <nav class="flex flex-col gap-3">
            <Navlink v-for="navLink in section.navLinks" :key="navLink.id" :href="navLink.href"
                     class="grow-0 shrink-0 w-full">
              <span v-text="navLink.label.value" class="truncate"/>
            </Navlink>
          </nav>
        </section>
      </div>
    </div>
    <div v-text="t('footer.copyright')"/>
  </footer>
</template>

