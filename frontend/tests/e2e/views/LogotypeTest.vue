<script setup lang="ts">
import Logotype from "@/components/logotype/Logotype.vue";
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="box-content border-3 border-red-500"
         data-testid="logotype-container">
      <Logotype has-textual-logotype/>
    </div>
  </div>
</template>