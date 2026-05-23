<script setup lang="ts">
import {AiChatIcon, CopyIcon, Divider, IconButton, RefreshIcon} from "@/shared/ui";

withDefaults(defineProps<{
  author?: "self" | "other";
}>(), {
  author: "self"
});
</script>

<template>
  <div class="flex gap-3">
    <div v-if="author === 'other'"
         class="w-fit h-fit p-2 border rounded-full border-default
                bg-tertiary">
      <AiChatIcon class="icon-static
                         h-13 w-13"/>
    </div>
    <div class="flex flex-col gap-4
              px-4 py-3 border rounded-lg border-default
              bg-tertiary"
         :class="[
           author === 'self'
              ? 'rounded-bl-2xl'
              : 'rounded-br-2xl'
       ]">
      <slot/>
      <Divider/>
      <div class="icon-dynamic-inverse
                  flex items-center gap-3"
           :class="author === 'self' && 'flex-row-reverse'">
        <IconButton :size-rem="1.75"
                    color-primary="var(--color-secondary)"
                    color-secondary="var(--color-primary)"
                    color-hover-primary="var(--color-primary)"
                    color-hover-secondary="var(--color-secondary)">
          <CopyIcon/>
        </IconButton>
        <IconButton v-if="author === 'other'"
                    color-primary="var(--color-secondary)"
                    color-secondary="var(--color-primary)"
                    color-hover-primary="var(--color-primary)"
                    color-hover-secondary="var(--color-secondary)"
                    :size-rem="1.6">
          <RefreshIcon/>
        </IconButton>
      </div>
    </div>
  </div>
</template>