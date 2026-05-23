import {type MaybeRefOrGetter, toValue} from "vue";
import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api";
import {send} from "../endpoints/chat-messages";
import {chatMessagesQueryKeys} from "../query-keys/chat-messages-query-keys";
import type {SendChatMessageDto} from "../../model/send-chat-message.dto";
import type {ChatMessageResponseDto} from "../../model/chat-message-response.dto";

export function createSendChatMessageMutation(chatId: MaybeRefOrGetter) {
    return useMutation({
        mutationFn: async (sendChatMessageDto: SendChatMessageDto) => {
            return send(toValue(chatId), sendChatMessageDto);
        },
        onSuccess: async (assistantMessage) => {
            await queryClient.setQueryData(
                chatMessagesQueryKeys.byChat(toValue(chatId)),
                (old: ChatMessageResponseDto[] | undefined) => {
                    if (!old) return old;
                    return [...old, assistantMessage];
                }
            );
        },
    });
}