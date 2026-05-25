import {useMutation} from "@tanstack/vue-query";
import {queryClient} from "@/shared/api";
import {remove} from "../endpoints/chats";
import {chatsQueryKeys} from "../query-keys/chats-query-keys";
import type {ChatResponseDto} from "@/entities/chat";

export function createDeleteChatMutation() {
    return useMutation({
        mutationFn: (chatId: number) => remove(chatId),
        onSuccess: async (_, variables) => {
            await queryClient.setQueryData(
                chatsQueryKeys.all,
                (old: ChatResponseDto[] | undefined) => {
                    if (!old) return old;
                    return old.filter(({id}) => id !== variables);
                }
            )
        }
    })
}