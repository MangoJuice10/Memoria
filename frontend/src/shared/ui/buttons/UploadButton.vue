<script setup lang="ts">
import {Button, IconLabel} from "@/shared/ui";
import {UploadIcon} from "@/shared/ui/icons";
import {ref} from "vue";

const emit = defineEmits<{
  (e: "change", file: File | undefined): void,
}>();

const inputRef = ref<HTMLInputElement>();

function handleButtonClick() {
  if (!inputRef.value) throw new Error("The file input didn't render");
  inputRef.value.click();
}

function handleFileChange(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  emit("change", file);
}
</script>

<template>
  <div>
    <Button @click.prevent="handleButtonClick">
      <IconLabel>
        <template #icon>
          <UploadIcon class="w-7 h-7"/>
        </template>
        <template #label>
          {{ $t("actions.upload") }}
        </template>
      </IconLabel>
    </Button>
    <input ref="inputRef"
           type="file"
           class="hidden"
           @change="handleFileChange">
  </div>
</template>