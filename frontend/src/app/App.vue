<script setup lang="ts">
import {useLoadingScreenStore} from "./router/loading-screen.store.ts";
import {useModalStore} from "@/shared/model";
import LoadingScreen from "./router/LoadingScreen.vue";
import {ToastContainer} from "@/shared/ui";

const loadingScreenStore = useLoadingScreenStore();
const modalStore = useModalStore();
</script>
<template>
  <div>
    <LoadingScreen v-if="loadingScreenStore.isLoading"/>
    <component v-if="modalStore.isVisible"
               :is="modalStore.getComponent()"
               v-bind="modalStore.getProps()"/>
    <ToastContainer/>
    <RouterView/>
  </div>
</template>