<script setup lang="ts">
import Logo from "@/components/logo/Logo.vue";
import Resizable from "@/components/utils/Resizable.vue";
import noImage from "@/assets/filler/noImage.png";
</script>

<template>
  <div class="h-full w-full p-20">
    <div class="flex justify-center items-center min-h-screen">
      <Logo has-logotype/>
    </div>
    <Resizable has-top-resize-handle has-right-resize-handle has-bottom-resize-handle has-left-resize-handle min-height="129px">
      <div class="bg-red-500">
        1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
      </div>
    </Resizable>
    <br>
    <br>
    <Resizable has-top-resize-handle has-right-resize-handle has-bottom-resize-handle has-left-resize-handle>
      <div class="flex flex-col flex-wrap bg-red-500">
        <div>abcdef</div>
        <div>ghijkl</div>
        <div>mnopqr</div>
        <div>stuvwx</div>
      </div>
    </Resizable>
    <br>
    <br>
    <Resizable has-top-resize-handle has-right-resize-handle has-bottom-resize-handle has-left-resize-handle>
      <img :src="noImage" alt="" class="bg-white">
    </Resizable>
  </div>
</template>