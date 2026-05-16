<script setup lang="ts">
import {ErrorIllustration} from "@/shared/ui";
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div>
      <ErrorIllustration class="icon-dynamic
                        w-80 h-80"/>
    </div>
    <div class="text-3xl font-black text-center">
      <slot/>
    </div>
  </div>
</template>