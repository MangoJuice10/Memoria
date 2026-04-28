<script setup lang="ts">
import {useNavbar} from "@/widgets/navbar/lib/useNavbar";
import NavbarLinks from "./NavbarLinks.vue";
import Logo from "@/shared/ui/logo/Logo.vue";
import {BurgerMenu} from "@/shared/ui";
import {LocalizedLink} from "@/shared/ui";
import {useViewerStore} from "@/entities/viewer";
import {storeToRefs} from "pinia";
import NavbarPreferences from "@/widgets/navbar/ui/NavbarPreferences.vue";
import NavbarActions from "@/widgets/navbar/ui/NavbarActions.vue";

const viewer = useViewerStore();
const {isAuthenticated} = storeToRefs(viewer);
const {navigationItemViews, sidebarControls} = useNavbar(isAuthenticated);

</script>

<template>
  <header
      class="flex justify-between items-stretch gap-[3%] w-navbar h-navbar px-navbar border-b border-b-border bg-primary">
    <div class="shrink-0 inline-flex justify-center items-center gap-1">
      <BurgerMenu @toggle="sidebarControls.toggle"/>
      <LocalizedLink name="home" class="block h-full min-w-0 max-w-full max-h-full">
        <Logo has-logotype logotype-classes="max-lg:hidden" class="py-2"/>
      </LocalizedLink>
    </div>
    <NavbarLinks :navigation-item-views/>
    <NavbarPreferences/>
    <NavbarActions :is-authenticated
                   class="empty:hidden"/>
  </header>
</template>