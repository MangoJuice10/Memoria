<script setup lang="ts">
import {Navbar} from "@/widgets/navbar";
import {Sidebar} from "@/widgets/sidebar";
import {Backdrop} from "@/shared/ui";
import {useModalStore} from "@/shared/model";

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