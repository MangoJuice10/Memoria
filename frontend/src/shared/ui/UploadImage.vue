<script setup lang="ts">
import UploadButton from "@/shared/ui/buttons/UploadButton.vue";
import {computed, ref} from "vue";

const props = defineProps<{
  imgUrl: string;
  imgSizeRem?: number;
  imgClasses: string;
}>();

const style = computed(() => ({
  width: props.imgSizeRem ? `${props.imgSizeRem}rem` : "100%",
  height: props.imgSizeRem ? `${props.imgSizeRem}rem` : "100%"
}));

const emit = defineEmits<{
  (e: "img-change", file: File | null): void,
}>();

const imgPreviewUrl = ref<string | null>(null);
const imgSrc = computed(() => imgPreviewUrl.value || props.imgUrl);

function handleImgChange(file: File | null) {
  if (imgPreviewUrl.value) {
    URL.revokeObjectURL(imgPreviewUrl.value);
    imgPreviewUrl.value = null;
  }

  if (file) imgPreviewUrl.value = URL.createObjectURL(file);

  emit("img-change", file);
}
</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <img :src="imgSrc" alt=""
         class="w-full h-full object-cover"
         :class="props.imgClasses"
         :style>
    <UploadButton class="w-35"
                  @change="handleImgChange"/>
  </div>
</template>