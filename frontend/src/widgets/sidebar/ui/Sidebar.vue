<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useSidebar} from "@/widgets/sidebar/lib/useSidebar.ts";
import {useViewerStore} from "@/entities/viewer";
import {LocalizedLink, Logo} from "@/shared/ui";
import SidebarToggle from "./SidebarToggle.vue";
import SidebarSections from "./SidebarSections.vue";

defineProps<{
  isVisible: boolean;
}>();

const viewer = useViewerStore();
const {isAuthenticated} = storeToRefs(viewer);
const {navigationSectionViews} = useSidebar(isAuthenticated);

</script>

<template>
  <Transition name="sidebar">
    <aside v-show="isVisible" class="flex flex-col w-sidebar h-sidebar border-r border-default bg-primary">
      <div class="flex items-center gap-1 w-full h-navbar px-sidebar border-b border-default">
        <SidebarToggle/>
        <LocalizedLink name="home" class="block h-full min-w-0 max-w-full max-h-full">
          <Logo has-logotype logotype-classes="max-lg:hidden" class="shrink-0 py-2"/>
        </LocalizedLink>
      </div>
      <div class="h-full overflow-auto px-sidebar">
        <SidebarSections :navigation-section-views/>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.sidebar-enter-from {
  opacity: 0;
  transform: translateX(-10px) scaleX(0);
}

.sidebar-enter-to {
  opacity: 1;
  transform: translateX(0px) scaleX(1);
}

.sidebar-enter-active {
  transition: opacity 200ms ease, transform 200ms ease;
  transform-origin: left;
}

.sidebar-leave-from {
  opacity: 1;
  transform: translateX(0) scaleX(1);
}

.sidebar-leave-to {
  opacity: 0;
  transform: translateX(0) scaleX(0);
}

.sidebar-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
  transform-origin: left;
}
</style>