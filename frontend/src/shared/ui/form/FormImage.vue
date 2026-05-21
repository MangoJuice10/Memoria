<script setup lang="ts">
defineProps<{
  src: string;
  alt: string;
  imgClasses?: string;
}>();
</script>

<template>
  <div>
    <img :src
         :alt
         class="w-35 h-35 sm:w-50 sm:h-50 md:w-80 md:h-80 lg:w-90 lg:h-90 xl:w-100 xl:h-100 object-cover"
         :class="imgClasses">
  </div>
</template>