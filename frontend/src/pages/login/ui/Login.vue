<script setup lang="ts">
import LoginForm from "@/pages/login/ui/LoginForm.vue";
import {Resizable} from "@/shared/ui";
</script>

<template>
  <div class="flex flex-col items-center
              min-h-screen">
    <Resizable has-right-resize-handle
               has-left-resize-handle
               min-width="25vw">
      <LoginForm class="mt-30"/>
    </Resizable>
  </div>
</template>