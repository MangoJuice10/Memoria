<script setup lang="ts">
import IconText from "@/components/utils/IconText.vue";
import StarIcon from "@/components/icons/utils/StarIcon.vue";

defineProps<{
  name: string;
  rating: number;
  imagePath: string
}>();
</script>

<template>
  <div class="group grid grid-rows-9 justify-items-center w-80 h-70 overflow-hidden border-2 rounded-lg border-border cursor-pointer">
    <img :src="imagePath" class="row-span-7 h-full w-full">
    <div class="row-span-2 w-full p-5 bg-inactive group-hover:bg-active">
      <div class="flex justify-between">
        <div v-text="name" class="text-text-inverse font-semibold line-clamp-1"/>
        <IconText :text="rating.toFixed(1)" :isReverse="true" class="text-text-inverse font-semibold">
          <StarIcon class="w-6 aspect-square"/>
        </IconText>
      </div>
    </div>
  </div>
</template>

