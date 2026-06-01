<script setup lang="ts">
import {AddIcon} from "@/shared/ui/icons";
import {IconLabel} from "@/shared/ui";
</script>

<template>
  <div class="flex justify-center items-center
             border border-dashed border-default rounded-2xl
             bg-primary cursor-pointer
             transition duration-200
             hover:scale-105">
    <IconLabel class="gap-2.5">
      <template #label>
        <span class="text-sm md:text-base">
          <slot/>
        </span>
      </template>
      <template #icon>
        <AddIcon class="w-1/8"/>
      </template>
    </IconLabel>
  </div>
</template>