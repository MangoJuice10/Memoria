<script setup lang="ts">
import Logo from "@/components/logo/Logo.vue";
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="box-content border-3 border-red-500"
         data-testid="logo-container">
      <Logo has-logotype/>
    </div>
  </div>
</template>