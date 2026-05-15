<script setup lang="ts">
import LoadingScreen from "./router/LoadingScreen.vue";
import {useLoadingScreenStore} from "./router/loading-screen.store.ts";

const loadingScreenStore = useLoadingScreenStore();
</script>
<template>
  <div>
    <LoadingScreen v-if="loadingScreenStore.isLoading"/>
    <RouterView/>
  </div>
</template>