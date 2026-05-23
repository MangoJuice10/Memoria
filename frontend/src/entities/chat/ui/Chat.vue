<script setup lang="ts">
import axios from "axios";
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {storeToRefs} from "pinia";
import {useChatStore} from "@/entities/chat";
import {useValidation} from "@/shared/lib";
import {createFindAllChatsQuery} from "@/entities/chat";
import {
  createFindAllChatMessagesQuery,
  createSendChatMessageMutation,
  ChatMessage,
} from "@/entities/chat-message";
import {
  AddIcon,
  Dropdown,
  FormFieldError,
  HistoryIcon,
  IconButton,
  IconLabel,
  QueryState,
  Resizable
} from "@/shared/ui";
import {type ErrorResponse} from "@/shared/api";
import {
  type CreateChatMessageDto,
  createCreateChatMessageSchema
} from "@/entities/chat-message/model/create-chat-message.schema";
import {createCreateChatMutation} from "@/entities/chat/api";
import ChatToggle from "./ChatToggle.vue";
import ChatTextarea from "./ChatTextarea.vue";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

defineOptions({
  inheritAttrs: false,
});

const {t} = useI18n();
const chatStore = useChatStore();
const {activeChat, isVisible, context} = storeToRefs(chatStore);
const {toggle, setActiveChat} = chatStore;

const data = ref<CreateChatMessageDto>({
  content: ""
});

const {
  isValid,
  isFieldTouched,
  isFormTouched,
  touch,
  touchAll,
  getError,
  clientValidate,
  serverValidate,
  reset
} = useValidation(data, createCreateChatMessageSchema(t), {
  mode: "eager",
  delay: 300,
});

const findAllChatsQuery = createFindAllChatsQuery();
const createChatMutation = createCreateChatMutation();

const findAllChatMessagesQuery = createFindAllChatMessagesQuery(() => activeChat.value?.id, computed(() => !!activeChat.value));
const sendChatMessageMutation = createSendChatMessageMutation(() => activeChat.value?.id);

const isSendEnabled = computed(() =>
    isFormTouched() && isValid.value && !sendChatMessageMutation.isPending.value
);

async function send() {
  touchAll();

  const result = await clientValidate();
  if (!result.success) return;

  if (!activeChat.value) {
    const newChat = await createChatMutation.mutateAsync({});
    setActiveChat(newChat);
  }

  try {
    if (context.value) await sendChatMessageMutation.mutateAsync({
      ...result.data,
      ...context.value
    });
  } catch (error) {
    data.value.content = result.data.content;
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ErrorResponse;
      await serverValidate(body);
    }
  }
}
</script>

<template>
  <Transition name="chat" mode="out-in">
    <Resizable v-if="isVisible"
               v-bind="$attrs"
               has-left-resize-handle>
      <div class="flex flex-col items-center
                  overflow-y-auto border-l border-default
                  bg-primary">
        <div class="flex justify-between items-center
                    relative
                    w-full border-b border-default">
          <ChatToggle :is-expanded="true"
                      class="bg-tertiary"
                      @click="toggle"/>
          <span class="text-2xl font-semibold">
            {{ activeChat ? activeChat.title : "New chat" }}
          </span>
          <Dropdown :is-relative="false"
                    side="bottom"
                    align="left"
                    trigger-classes="h-full"
                    menu-classes="w-1/2"
                    class="w-1/6 h-full border-l border-default
                           bg-tertiary">
            <template #trigger>
              <IconButton :size-rem="3"
                          :has-color="false">
                <HistoryIcon/>
              </IconButton>
            </template>

            <template #menu>
              <QueryState v-if="findAllChatsQuery.data.value"
                          :is-loading="findAllChatsQuery.isLoading.value"
                          :error="findAllChatsQuery.error.value"
                          error-classes="w-3/5 h-3/5"
                          error-label-classes="text-sm">
                <div class="flex flex-col divide-y divide-default
                          p-5 border rounded-2xl border-default
                          text-base truncate
                          bg-tertiary">
                  <button @click="setActiveChat(null)">
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
                  <button v-for="chat in findAllChatsQuery.data.value"
                          :key="chat.id"
                          class="px-5 py-3 text-left truncate
                                   hover:bg-hover transition-colors"
                          :class="chat.id === activeChat?.id && 'font-semibold text-inverse' +
                                                                'bg-secondary'"
                          @click="setActiveChat(chat)">
                    {{ chat.title || `${$t(codeToKey(codes.CHAT_RESOURCE_NAME))} #${chat.id}` }}
                  </button>
                </div>
              </QueryState>
            </template>
          </Dropdown>
        </div>

        <div class="flex flex-col gap-10
                    h-full w-full p-10 overflow-y-auto
                    text-base">
          <div v-if="!activeChat"
               class="flex justify-center items-center
                      h-full w-full">
            <IconLabel class="gap-3
                              w-3/4 h-3/4
                              opacity-90">
              <template #icon>
                <AddIcon class="w-10 h-10"/>
              </template>
              <template #label>
                <span class="font-semibold">
                  Select a chat from the history or create a new one.
                </span>
              </template>
            </IconLabel>
          </div>

          <QueryState v-else :is-loading="findAllChatMessagesQuery.isLoading.value"
                      :error="findAllChatMessagesQuery.error.value"
                      error-classes="w-2/5 h-2/5"
                      error-label-classes="text-xl">
            <div v-if="findAllChatMessagesQuery.data.value">
              <ChatMessage v-for="message in findAllChatMessagesQuery.data.value"
                           :key="message.id"
                           :author="message.role === 'USER' ? 'self' : 'other'">
                {{ message.content }}
              </ChatMessage>
              <ChatMessage v-if="sendChatMessageMutation.isPending.value"
                           author="other">
                <span class="animate-pulse">…</span>
              </ChatMessage>
            </div>
            <div v-else>
              <span>
                No messages yet
              </span>
            </div>
          </QueryState>
        </div>

        <div class="w-full p-10 border-t border-default">
          <FormFieldError :error="getError('content')"
                          :touched="isFieldTouched('content')"
                          class="mb-3"/>
          <ChatTextarea v-model="data.content"
                        :is-send-enabled="isSendEnabled"
                        class="w-full max-h-[20vh]"
                        @send="send"
                        @input="() => touch('content')"/>
        </div>
      </div>
    </Resizable>

    <ChatToggle v-else
                :is-expanded="false"
                @click="toggle"/>
  </Transition>
</template>

<style scoped>
.chat-enter-active,
.chat-leave-active {
  transition: opacity 300ms ease, transform 300ms ease;
}

.chat-enter-from,
.chat-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>