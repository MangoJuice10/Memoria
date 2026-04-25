<script setup lang="ts">
import LoginForm from "@/pages/login/ui/LoginForm.vue";
import {Resizable} from "@/shared/resizable";
</script>

<template>
  <div class="flex justify-center min-h-screen">
    <Resizable has-right-resize-handle
               has-left-resize-handle
               min-width="25vw">
      <LoginForm class="mt-50"/>
    </Resizable>
  </div>
</template>