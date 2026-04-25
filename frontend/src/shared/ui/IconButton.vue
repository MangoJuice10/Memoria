<script setup lang="ts">
</script>
<template>
  <div class="border rounded-full border-transparent
       hover:border-default hover:bg-hover cursor-pointer
        focus-visible:border-default focus-visible:bg-focus"
       role="button" tabindex="0"
       @keydown.enter="$emit('click')"
       @keydown.space="$emit('click')">
    <div class="flex justify-center items-center p-[15%]">
      <slot/>
    </div>
  </div>
</template>