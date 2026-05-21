<script setup lang="ts">
import {EmptyFileIcon, FileIcon} from "@/shared/ui";

defineProps<{
  filename?: string | null;
  labelClasses?: string;
  imgClasses?: string;
}>();
</script>

<template>
  <div v-if="filename"
       class="flex flex-col items-center gap-3">
    <FileIcon class="w-20 h-20 sm:w-25 sm:h-25 md:w-30 md:h-30 lg:w-35 lg:h-35 xl:w-40 xl:h-40 object-cover"
              :class="imgClasses"/>
    <span class="truncate"
          :class="labelClasses">
      {{ filename }}
    </span>
  </div>
  <div v-else>
    <EmptyFileIcon class="w-25 h-25 sm:w-30 sm:h-30 md:w-35 md:h-35 lg:w-40 lg:h-40 xl:w-45 xl:h-45 object-cover"
                   :class="imgClasses"/>
  </div>
</template>