import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api";
import {send} from "../endpoints/chat-messages";
import {chatMessagesQueryKeys} from "../query-keys/chat-messages-query-keys";
import type {SendChatMessageDto} from "../../model/send-chat-message.dto";
import type {ChatMessageResponseDto} from "../../model/chat-message-response.dto";

export function createSendChatMessageMutation() {
    return useMutation({
        mutationFn: async ({chatId, sendChatMessageDto}: {
            chatId: number;
            sendChatMessageDto: SendChatMessageDto
        }) => {
            return send(chatId, sendChatMessageDto);
        },
        onSuccess: async (assistantMessage, variables) => {
            await queryClient.setQueryData(
                chatMessagesQueryKeys.byChat(variables.chatId),
                (old: ChatMessageResponseDto[] | undefined) => {
                    if (!old) return old;
                    return [...old, assistantMessage];
                }
            );
        },
    });
}