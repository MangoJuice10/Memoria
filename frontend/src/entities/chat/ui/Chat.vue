<script setup lang="ts">
import axios from "axios";
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {storeToRefs} from "pinia";
import {type ChatResponseDto, chatsQueryKeys, useChatStore} from "@/entities/chat";
import {useValidation} from "@/shared/lib";
import {createFindAllChatsQuery} from "@/entities/chat";
import {
  type ChatMessageResponseDto,
  chatMessagesQueryKeys,
  createFindAllChatMessagesQuery,
  createSendChatMessageMutation,
} from "@/entities/chat-message";
import {
  FormFieldError,
  Resizable
} from "@/shared/ui";
import {type ErrorResponse, queryClient} from "@/shared/api";
import {
  type CreateChatMessageDto,
  createCreateChatMessageSchema
} from "@/entities/chat-message/model/create-chat-message.schema";
import {createCreateChatMutation} from "@/entities/chat/api";
import ChatToggle from "./ChatToggle.vue";
import ChatTextarea from "./ChatTextarea.vue";
import ChatsPanel from "@/entities/chat/ui/ChatsPanel.vue";
import ChatContent from "@/entities/chat/ui/ChatContent.vue";
import {useViewerStore} from "@/entities/viewer";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

defineOptions({
  inheritAttrs: false,
});

const {t} = useI18n();
const viewer = useViewerStore();
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
} = useValidation(data, createCreateChatMessageSchema(), {
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

  try {
    if (!activeChat.value) {
      const newChat = await createChatMutation.mutateAsync({});
      setActiveChat(newChat);
      await queryClient.invalidateQueries({
        queryKey: chatMessagesQueryKeys.byChat(newChat.id)
      });
    }

    reset();

    const newChatMessage: ChatMessageResponseDto = {
      id: 0,
      role: "USER",
      content: result.data.content,
      chatId: activeChat.value!.id,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString()
    };

    await queryClient.setQueryData(
        chatMessagesQueryKeys.byChat(activeChat.value!.id),
        (old: ChatMessageResponseDto[] | undefined) => {
          if (!old) return [newChatMessage];
          return [...old, newChatMessage];
        }
    );

    if (context.value) await sendChatMessageMutation.mutateAsync({
      ...result.data,
      ...context.value
    });

    await queryClient.invalidateQueries({
      queryKey: chatsQueryKeys.all
    });
    const updatedChats = queryClient.getQueryData<ChatResponseDto[]>(chatsQueryKeys.all);
    if (updatedChats) {
      const updatedChat = updatedChats.find(({id}) => id === activeChat.value!.id);
      if (updatedChat) setActiveChat(updatedChat);
    }
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
          <div class="flex justify-center items-center
                      px-5">
            <span class="text-2xl font-semibold line-clamp-2">
              {{
                activeChat
                    ? activeChat.title ?? `${t(codeToKey(codes.CHAT_DEFAULT_TITLE))}`
                    : `${t(codeToKey(codes.CHAT_DEFAULT_TITLE))}`
              }}
            </span>
          </div>
          <ChatsPanel :chats="findAllChatsQuery.data.value"
                      :chats-is-loading="findAllChatsQuery.isLoading.value"
                      :chatsError="findAllChatsQuery.error.value"
                      :active-chat
                      @create:chat="setActiveChat(null)"
                      @select:chat="setActiveChat"
                      class="shrink-0"/>
        </div>

        <ChatContent :chat-messages="findAllChatMessagesQuery.data.value"
                     :chat-messages-is-loading="findAllChatMessagesQuery.isLoading.value"
                     :chatMessagesError="findAllChatMessagesQuery.error.value"
                     :active-chat
                     :new-chat-message-is-pending="sendChatMessageMutation.isPending.value"
                     :user-avatar-url="viewer.viewer?.avatarUrl"/>

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