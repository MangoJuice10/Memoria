<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useViewerStore} from "@/entities/viewer";
import {LocalizedLink, Logo} from "@/shared/ui";
import {BurgerMenu} from "@/shared/ui";
import {useSidebar} from "../lib/useSidebar.ts";
import SidebarSections from "./SidebarSections.vue";
import {UserPanel} from "@/features/settings";
import {useBackdropStore} from "@/shared/model";
import {useSidebarStore} from "@/shared/model";
import {Resizable} from "@/shared/resizable";

const viewerStore = useViewerStore();
const {isAuthenticated} = storeToRefs(viewerStore);

const sidebarStore = useSidebarStore();
const backdropStore = useBackdropStore();

const {navigationSectionViews} = useSidebar(isAuthenticated);

function handleToggle() {
  sidebarStore.toggle();

  if (sidebarStore.isVisible) backdropStore.show();
  else backdropStore.hide();
  backdropStore.setCallback(() => {
    sidebarStore.hide();
  });
}
</script>

<template>
  <Transition name="sidebar">
    <aside v-show="sidebarStore.isVisible" class="fixed inset-y-0 left-0 z-40
                                                  w-fit border-r border-default
                                                  bg-primary">
      <Resizable has-right-resize-handle
                 class="w-sidebar min-w-[25vw] h-sidebar">
        <div class="flex flex-col">
          <div class="flex items-center gap-1 w-full h-navbar px-sidebar border-b border-default">
            <BurgerMenu @toggle="handleToggle"/>
            <LocalizedLink name="home" class="block h-full min-w-0 max-w-full max-h-full">
              <Logo has-logotype logotype-classes="max-lg:hidden" class="shrink-0 py-2"/>
            </LocalizedLink>
          </div>
          <div class="h-full overflow-auto px-sidebar">
            <SidebarSections :navigation-section-views/>
          </div>
          <UserPanel v-if="isAuthenticated"/>
        </div>
      </Resizable>
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