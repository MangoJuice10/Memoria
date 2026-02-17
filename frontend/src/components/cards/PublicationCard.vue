<script setup lang="ts">
import IconLabel from "@/components/utils/IconLabel.vue";
import StarIcon from "@/components/icons/utils/StarIcon.vue";

defineProps<{
  name: string;
  rating: number;
  imagePath: string
}>();
</script>

<template>
  <div
      class="group grid grid-rows-9 justify-items-center w-80 h-70 overflow-hidden border-2 rounded-lg border-default cursor-pointer">
    <img :src="imagePath" alt="" class="row-span-7 h-full w-full">
    <div class="row-span-2 w-full p-5 bg-inactive group-hover:bg-active">
      <div class="flex justify-between">
        <div v-text="name" class="text-inverse font-semibold line-clamp-1"/>
        <IconLabel :isReverse="true" class="text-inverse font-semibold">
          <template #icon>
            <StarIcon class="w-6 aspect-square"/>
          </template>
          <template>
            <span v-text="rating.toFixed(1)"/>
          </template>
        </IconLabel>
      </div>
    </div>
  </div>
</template>

