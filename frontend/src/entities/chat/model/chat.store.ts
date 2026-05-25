import {ref} from "vue";
import {defineStore} from "pinia";
import {useVisibility} from "@/shared/lib";
import type {VisibilityControls} from "@/shared/model";
import type {ChatContext} from "@/entities/chat-message";
import type {ChatResponseDto} from '../model/chat-response.dto';

export const useChatStore = defineStore("chat", () => {
    const activeChat = ref<ChatResponseDto | null>(null);

    const context = ref<ChatContext | null>(null);

    function setActiveChat(chat: ChatResponseDto | null) {
        activeChat.value = chat;
    }

    function setContext(ctx: ChatContext) {
        context.value = ctx;
    }

    const visibility = useVisibility();

    return {
        ...visibility,
        activeChat,
        context,
        setActiveChat,
        setContext,
    } satisfies VisibilityControls & Record<string, unknown>;
});