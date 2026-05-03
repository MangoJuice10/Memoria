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
  <Navbar/>
  <Sidebar/>
  <Backdrop/>
  <component v-if="modalStore.isVisible"
             :is="modalStore.component"
             v-bind="modalStore.props"/>
  <RouterView/>
</template>