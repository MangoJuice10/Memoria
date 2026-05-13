<script setup lang="ts">
import {IconLabel} from "@/shared/ui";
import {UploadIcon} from "@/shared/ui/icons";

const emit = defineEmits<{
  (e: "change", file: File | null): void,
}>();

function handleFileChange(e: Event | null) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0] ?? null;
  emit("change", file);
}
</script>

<template>
  <label class="flex justify-center items-center
         p-button border border-default rounded-xl text-inverse
         font-semibold bg-secondary
         cursor-pointer
         hover:bg-hover active:bg-primary hover:text-hover active:text-default
         hover:scale-105 active:scale-110
         disabled:text-disabled disabled:bg-disabled
         transition-all ease-in duartion-300">
    <IconLabel>
      <template #icon>
        <UploadIcon class="w-7 h-7"/>
      </template>
      <template #label>
        {{ $t("actions.upload") }}
      </template>
    </IconLabel>
    <input type="file"
           class="hidden"
           @change="handleFileChange">
  </label>
</template>