<script setup lang="ts">
import {AddIcon, Dropdown, HistoryIcon, IconButton, IconLabel, QueryState, TrashIcon} from "@/shared/ui";
import {type ChatResponseDto, createDeleteChatMutation} from "@/entities/chat";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

defineProps<{
  chats: ChatResponseDto[] | undefined;
  chatsIsLoading: boolean;
  chatsError: Error | null;
  activeChat: ChatResponseDto | null;
}>();

defineEmits<{
  (e: "select:chat", chat: ChatResponseDto): void;
  (e: "create:chat"): void
}>();

const deleteChatMutation = createDeleteChatMutation();
</script>

<template>
  <Dropdown :is-relative="false"
            side="bottom"
            align="left"
            trigger-classes="h-full"
            menu-classes="w-2/3"
            class="w-1/6 h-full border-l border-default
                           bg-tertiary">
    <template #trigger>
      <IconButton :size-rem="3"
                  :has-color="false">
        <HistoryIcon/>
      </IconButton>
    </template>

    <template #menu>
      <QueryState v-if="chats"
                  :is-loading="chatsIsLoading"
                  :error="chatsError"
                  error-classes="w-3/5 h-3/5"
                  error-label-classes="text-sm">
        <div class="flex flex-col divide-y divide-default
                          max-h-[50vh] border rounded-2xl border-default overflow-y-auto
                          text-base
                          bg-tertiary">
          <button class="shrink-0
                         h-15 px-5 py-3 text-left
                         hover:bg-hover transition-colors"
                  @click="$emit('create:chat')">
            <IconLabel>
              <template #icon>
                <AddIcon class="w-7 h-7"/>
              </template>
              <template #label>
                <span>
                  {{ $t(codeToKey(codes.CHAT_CREATE_DESCRIPTION)) }}
                </span>
              </template>
            </IconLabel>
          </button>
          <button v-for="chat in chats"
                  :key="chat.id"
                  class="shrink-0
                         flex justify-between items-center
                         h-15 px-5 py-3 text-left
                         truncate
                         hover:bg-hover transition-colors"
                  :class="chat.id === activeChat?.id && 'font-semibold text-inverse' +
                                                                'bg-secondary'"
                  @click="$emit('select:chat', chat)">
            <span class="truncate">
              {{ chat.title ?? `${$t(codeToKey(codes.CHAT_DEFAULT_TITLE))}` }}
            </span>
            <button @click.prevent="deleteChatMutation.mutateAsync(chat.id)"
                    class="hover:scale-105">
              <TrashIcon class="w-7 h-7"/>
            </button>
          </button>
        </div>
      </QueryState>
    </template>
  </Dropdown>
</template>