<script setup lang="ts">
import {ref, provide, watch} from "vue";
import {useBackdrop} from "@/shared/lib/useBackdrop.ts";
import {Navbar} from "@/widgets/navbar";
import {Sidebar} from "@/widgets/sidebar";
import {Resizable} from "@/shared/resizable";
import type {Controls} from "@/shared/model";

const backdrop = useBackdrop();

const isBackdropVisible = ref(false);
provide<Controls>("sidebar", {
  show: () => {
    backdrop.showBackdrop();
    isBackdropVisible.value = true;
  },
  hide: () => {
    backdrop.hideBackdrop();
    isBackdropVisible.value = false;
  },
  toggle: () => {
    backdrop.toggleBackdrop();
    isBackdropVisible.value = !isBackdropVisible.value;
  }
});

watch(backdrop.isBackdropVisible, (value: boolean) => {
  isBackdropVisible.value = value;
});
</script>

<template>
  <div class="fixed inset-x-0 top-0 z-50">
    <Navbar/>
  </div>
  <div v-show="isBackdropVisible" class="fixed inset-y-0 left-0 z-100">
    <Resizable has-right-resize-handle min-width="25vw">
      <Sidebar :is-visible="isBackdropVisible"/>
    </Resizable>
  </div>
  <RouterView/>
</template>