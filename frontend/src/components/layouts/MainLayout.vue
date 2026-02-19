<script setup lang="ts">
import {ref, provide, inject, watch, type Ref} from "vue";
import Navbar from "@/components/navigation/navbar/Navbar.vue";
import Sidebar from "@/components/navigation/sidebar/Sidebar.vue";
import Resizable from "@/components/utils/Resizable.vue";

const overlay = inject<{
  isOverlayVisible: Ref<boolean>;
  showOverlay: () => void;
  hideOverlay: () => void;
  toggleOverlay: () => void;
}>("overlay");

if (!overlay) throw new Error("Overlay's state and methods weren't provided");

const isSidebarVisible = ref(false);
provide("sidebar", {
  showSidebar: () => {
    overlay.showOverlay();
    isSidebarVisible.value = true;
  },
  hideSidebar: () => {
    overlay.hideOverlay();
    isSidebarVisible.value = false;
  },
  toggleSidebar: () => {
    overlay.toggleOverlay();
    isSidebarVisible.value = !isSidebarVisible.value;
  }
});

watch(overlay.isOverlayVisible, (value: boolean) => {
  isSidebarVisible.value = value;
});
</script>

<template>
  <Navbar/>
  <div v-if="isSidebarVisible" class="fixed inset-y-0 left-0 z-100">
    <Resizable has-right-resize-handle>
      <Sidebar :is-visible="isSidebarVisible"/>
    </Resizable>
  </div>
  <slot/>
</template>