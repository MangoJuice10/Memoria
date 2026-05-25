<script setup lang="ts">
import {inject, nextTick, ref, watch} from "vue";
import {ChatMessage, type ChatMessageResponseDto} from "@/entities/chat-message";
import {ChatIcon, DotsIcon, IconLabel, MarkdownContent, QueryState} from "@/shared/ui";
import type {ChatResponseDto} from "@/entities/chat";
import {codes, resizableNaturalResizeKey} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

const props = defineProps<{
  chatMessages: ChatMessageResponseDto[] | undefined;
  chatMessagesIsLoading: boolean;
  chatMessagesError: Error | null;
  activeChat: ChatResponseDto | null;
  newChatMessageIsPending: boolean;
  userAvatarUrl?: string | null;
}>();

const handleNaturalResize = inject(resizableNaturalResizeKey);
if (!handleNaturalResize) throw new Error("The Resizable component didn't provide the natural resize handler");

const messageListRef = ref<HTMLElement | null>(null);

function scrollToBottom() {
  nextTick(() => {
    if (messageListRef.value) {
      messageListRef.value.scrollTop = messageListRef.value.scrollHeight;
    }
  });
}

watch(() => props.activeChat, () => {
  handleNaturalResize();
  scrollToBottom();
});

watch(() => [props.chatMessages, props.newChatMessageIsPending], () => {
  scrollToBottom();
}, { deep: true });

</script>

<template>
  <div class="flex flex-col gap-10
                    h-full w-full p-10 overflow-y-auto
                    text-base">
    <div v-if="!activeChat"
         class="flex justify-center items-center
                      h-full w-full">
      <IconLabel class="gap-4
                        w-3/4 h-3/4
                        opacity-70">
        <template #icon>
          <ChatIcon class="icon-dynamic-inverse
                           w-13 h-13"/>
        </template>
        <template #label>
          <span class="font-semibold text-lg">
            {{ $t(codeToKey(codes.CHAT_CREATE_HINT)) }}
          </span>
        </template>
      </IconLabel>
    </div>
    <QueryState v-else
                :is-loading="chatMessagesIsLoading"
                :error="chatMessagesError"
                error-classes="w-2/5 h-2/5"
                error-label-classes="text-xl"
                class="w-full h-full">
      <div v-if="chatMessages && chatMessages.length > 0"
           ref="messageListRef"
           class="flex flex-col gap-13
                        h-full p-10 overflow-y-auto
                        text-base">
        <ChatMessage v-for="message in chatMessages"
                     :key="message.id"
                     :author="message.role === 'USER' ? 'self' : 'other'"
                     :user-avatar-url>
          <MarkdownContent v-if="message.role === 'ASSISTANT'"
                           :content="message.content"/>
          <span v-else>
            {{ message.content }}
          </span>
        </ChatMessage>
        <ChatMessage v-if="newChatMessageIsPending"
                     author="other">
          <DotsIcon class="w-8 h-8
                           animate-pulse"/>
        </ChatMessage>
      </div>
      <div v-else
           class="flex justify-center items-center
                  w-full h-full">
        <IconLabel class="gap-4
                        w-3/4 h-3/4
                        opacity-70">
          <template #icon>
            <ChatIcon class="icon-dynamic-inverse
                           min-w-10 min-h-10"/>
          </template>
          <template #label>
          <span class="font-semibold text-lg">
            {{ $t(codeToKey(codes.CHAT_NO_MESSAGES)) }}
          </span>
          </template>
        </IconLabel>
      </div>
    </QueryState>
  </div>

</template>