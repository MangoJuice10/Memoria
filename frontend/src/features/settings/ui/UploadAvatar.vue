<script setup lang="ts">
import {computed, ref} from "vue";
import {UploadButton} from "@/shared/ui";

const props = defineProps<{
  avatarUrl: string;
  avatarSizeRem: number;
}>();

const emit = defineEmits<{
  (e: "avatar-change", file: File | null): void,
}>();

const style = computed(() => ({
  width: `${props.avatarSizeRem}rem`,
  height: `${props.avatarSizeRem}rem`,
}));

const avatarPreviewUrl = ref<string | null>(null);
const imgSrc = computed(() => avatarPreviewUrl.value || props.avatarUrl);

function handleAvatarChange(file: File | null) {
  if (avatarPreviewUrl.value) {
    URL.revokeObjectURL(avatarPreviewUrl.value);
    avatarPreviewUrl.value = null;
  }

  if (file) avatarPreviewUrl.value = URL.createObjectURL(file);

  emit("avatar-change", file);
}
</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <img :src="imgSrc"
         alt="Profile avatar preview"
         class="border border-default rounded-full
              object-cover"
         :style>
    <UploadButton class="w-35"
                  @change="handleAvatarChange"/>
  </div>
</template>