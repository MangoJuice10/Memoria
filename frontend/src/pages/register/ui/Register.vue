<script setup lang="ts">
import {RegisterForm} from "@/pages/register";
import {Resizable} from "@/shared/resizable";
</script>

<template>
  <div class="flex flex-col items-center
              min-h-screen">
    <Resizable has-right-resize-handle
               has-left-resize-handle
               min-width="25vw">
      <RegisterForm class="mt-30"/>
    </Resizable>
  </div>
</template>