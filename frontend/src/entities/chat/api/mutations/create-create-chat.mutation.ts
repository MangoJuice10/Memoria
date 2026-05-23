import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api/query-client.ts";
import {create} from "../endpoints/chats.ts";
import {chatsQueryKeys} from "../query-keys/chats-query-keys.ts";
import type {CreateChatDto} from "../../model/create-chat.schema";
import type {ChatResponseDto} from "../../model/chat-response.dto";

export function createCreateChatMutation() {
    return useMutation({
        mutationFn: (createChatDto: CreateChatDto) => create(createChatDto),
        onSuccess: async (newChat: ChatResponseDto) => {
            await queryClient.setQueryData(
                chatsQueryKeys.all,
                (old: ChatResponseDto[] | undefined) => {
                    if (!old) return old;
                    return [...old, newChat];
                }
            );
        },
    });
}