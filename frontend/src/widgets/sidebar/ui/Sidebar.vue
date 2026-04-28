<script setup lang="ts">
import SidebarToggle from "@/widgets/sidebar/ui/SidebarToggle.vue";
import Logo from "@/shared/ui/logo/Logo.vue";
import NavigationLink from "@/shared/ui/navigation/NavigationLink.vue";
import {useViewerStore} from "@/entities/viewer";
import {storeToRefs} from "pinia";
import {useSidebar} from "@/widgets/sidebar/lib/useSidebar.ts";
import {LocalizedLink} from "@/shared/ui";

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
        <section v-for="navigationSectionView in navigationSectionViews"
                 :key="navigationSectionView.id">
          <h3 v-text="navigationSectionView.label" class="max-w-full my-heading truncate text-muted"/>
          <nav class="flex flex-col items-start gap-5 h-full mb-section">
            <NavigationLink v-for="navigationItemView in navigationSectionView.navigationItemViews"
                            :key="navigationItemView.id"
                            :navigation-item-view
                            class="grow-0 w-full font-semibold px-2 py-1.5
                                   border rounded-xl border-transparent hover:border-default hover:bg-hover"/>
          </nav>
        </section>
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