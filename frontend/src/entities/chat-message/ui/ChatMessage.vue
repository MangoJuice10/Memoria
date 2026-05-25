<script setup lang="ts">
import {AiChatIcon, CopyIcon, Divider, IconButton, RefreshIcon} from "@/shared/ui";
import {Avatar} from "@/entities/user";
import {asset} from "@/shared/lib";

withDefaults(defineProps<{
  author?: "self" | "other";
  userAvatarUrl?: string | null;
}>(), {
  author: "self"
});
</script>

<template>
  <div class="flex gap-3"
       :class="author === 'self' && 'flex-row-reverse'">
    <div v-if="author === 'other'"
         class="w-fit h-fit p-2 border rounded-full border-default
                bg-tertiary">
      <AiChatIcon class="icon-static
                         w-13 h-13"/>
    </div>
    <Avatar v-else
            :src="userAvatarUrl ?? asset('filler/noAvatar.png')"
            class="w-18 h-18"/>
    <div class="flex flex-col gap-4
                px-4 py-3 border rounded-lg border-default overflow-x-auto
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