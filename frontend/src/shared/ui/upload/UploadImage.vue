<script setup lang="ts">
import {Button, FormImage, IconLabel, TrashIcon, UploadButton} from "@/shared/ui";
import {computed, ref} from "vue";

const props = defineProps<{
  oldImageUrl?: string | null;
  defaultImgUrl: string;
  imgClasses?: string;
}>();

const emit = defineEmits<{
  (e: "img-change", file: File | null): void,
}>();

const newImageUrl = ref<string | null | undefined>(undefined);
const displayImageUrl = computed(() => newImageUrl.value ?? props.oldImageUrl ?? props.defaultImgUrl);

function handleImgChange(file: File | null) {
  if (newImageUrl.value) URL.revokeObjectURL(newImageUrl.value);

  if (file) newImageUrl.value = URL.createObjectURL(file);
  else newImageUrl.value = props.defaultImgUrl;

  emit("img-change", file);
}
</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <FormImage :src="displayImageUrl"
               alt=""
               :imgClasses="props.imgClasses"/>
    <div class="flex gap-10">
      <UploadButton class="w-35"
                    @change="handleImgChange"/>
      <Button @click.prevent="handleImgChange(null)">
        <IconLabel class="gap-2.5">
          <template #icon>
            <TrashIcon class="w-7 h-7"/>
          </template>
          <template #label>
            {{ $t("actions.remove") }}
          </template>
        </IconLabel>
      </Button>
    </div>
  </div>
</template>