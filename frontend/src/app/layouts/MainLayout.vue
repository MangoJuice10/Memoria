<script setup lang="ts">
import {Navbar} from "@/widgets/navbar";
import {Sidebar} from "@/widgets/sidebar";
import {Resizable} from "@/shared/resizable";
import {Backdrop} from "@/shared/ui";
import {useModalStore, useSidebarStore} from "@/shared/model";

const sidebarStore = useSidebarStore();
const modalStore = useModalStore();
</script>

<template>
  <div class="fixed inset-x-0 top-0 z-40">
    <Navbar/>
  </div>
  <div v-show="sidebarStore.isVisible" class="fixed inset-y-0 left-0 z-50">
    <Resizable has-right-resize-handle min-width="25vw">
      <Sidebar/>
    </Resizable>
  </div>
  <Backdrop/>
  <component v-if="modalStore.isVisible"
             :is="modalStore.component"
             v-bind="modalStore.props"/>
  <RouterView/>
</template>