<script setup lang="ts">
import {IconLabel} from "@/shared/ui";
import {UploadIcon} from "@/shared/ui/icons";

withDefaults(defineProps<{
  hasColor?: boolean,
  hasHoverColor?: boolean,
  hasActiveColor?: boolean,
}>(), {
  hasColor: true,
  hasHoverColor: true,
  hasActiveColor: true,
});

const emit = defineEmits<{
  (e: "change", file: File | null): void,
}>();

function handleFileChange(e: Event | null) {
  const input = e?.target as HTMLInputElement;
  const file = input.files?.[0] ?? null;
  emit("change", file);
}
</script>

<template>
  <label class="flex justify-center items-center
                min-w-fit p-button border border-default rounded-xl
                text-inverse font-semibold
                shadow-[0px_4px_0px_0px_var(--color-secondary),0px_5px_0px_0px_var(--color-border-default)] cursor-pointer
                transition-all ease-in duartion-300
                hover:scale-105
                active:translate-y-1 active:shadow-none"
         :class="{
                   'bg-secondary': hasColor,
                   ['hover:text-hover hover:bg-hover\n' +
                    'hover:shadow-[0px_4px_0px_0px_var(--color-surface-hover),0px_5px_0px_0px_var(--color-border-default)']: hasHoverColor,
                   'active:bg-primary active:text-default': hasActiveColor
                 }">
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