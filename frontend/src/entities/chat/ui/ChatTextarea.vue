<script setup lang="ts">
import {IconButton, SendIcon} from "@/shared/ui";
import {codes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

defineProps<{
  isSendEnabled: boolean;
}>();

defineEmits<{
  "send": []
}>();

defineOptions({
  inheritAttrs: false,
});

const modelValue = defineModel<string>();
</script>

<template>
  <div class="flex justify-between items-center gap-10
              p-5 border rounded-lg border-default
              bg-tertiary
              hover:outline-2 hover:-outline-offset-1 hover:outline-active">
    <textarea v-model="modelValue"
              v-auto-resize
              :placeholder="$t(codeToKey(codes.CONTENT_PLACEHOLDER))"
              v-bind="$attrs"
              class="text-base lg:text-lg
                     outline-none"/>
    <IconButton :enabled="isSendEnabled"
                :size-rem="3.5"
                @click="$emit('send')">
      <SendIcon/>
    </IconButton>
  </div>
</template>