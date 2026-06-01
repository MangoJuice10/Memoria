<script setup lang="ts">
import {File, UploadButton} from "@/shared/ui";
import {computed, ref} from "vue";

const props = defineProps<{
  oldFileUrl?: string | null;
  oldFilename?: string | null;
  fileClasses?: string;
  labelClasses?: string;
  imgClasses?: string;
}>();

const emit = defineEmits<{
  (e: "file-change", file: File | undefined): void;
}>();

const newFileName = ref<string | undefined>(undefined);
const displayFileName = computed(() => newFileName.value ?? props.oldFilename);

function handleFileChange(file: File | undefined) {
  newFileName.value = file?.name ?? undefined;
  emit("file-change", file);
}
</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <File :filename="displayFileName"
          :imgClasses="imgClasses"
          label-classes="text-base font-semibold"
          :class="fileClasses"/>
    <UploadButton class="w-35"
                  @change="handleFileChange"/>
  </div>
</template>