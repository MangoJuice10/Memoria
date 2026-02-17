<script setup lang="ts">
import {ref, provide, inject, watch, type Ref} from "vue";
import Navbar from "@/components/navigation/navbar/Navbar.vue";
import Sidebar from "@/components/navigation/sidebar/Sidebar.vue";

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
  <Sidebar :is-visible="isSidebarVisible"/>
  <slot/>
</template>