<script setup lang="ts">
import {useBackdrop} from "@/shared/lib/useBackdrop.ts";
import Backdrop from "@/app/layouts/backdrop/Backdrop.vue";

const {isBackdropVisible} = useBackdrop();

</script>
<template>
  <div>
    <Backdrop v-if="isBackdropVisible" v-model:is-visible="isBackdropVisible"/>
    <RouterView/>
  </div>
</template>