import {computed, type MaybeRefOrGetter, toValue} from "vue";
import {useQuery} from "@tanstack/vue-query";
import {findAll} from "../endpoints/chat-messages";
import {chatMessagesQueryKeys} from "../query-keys/chat-messages-query-keys";

export function createFindAllChatMessagesQuery(chatId: MaybeRefOrGetter, enabled?: MaybeRefOrGetter<boolean>) {
    return useQuery({
        queryKey: computed(() => chatMessagesQueryKeys.byChat(toValue(chatId))),
        queryFn: () => findAll(toValue(chatId)),
        enabled
    });
}