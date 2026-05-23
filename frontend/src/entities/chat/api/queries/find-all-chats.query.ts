import {useQuery} from "@tanstack/vue-query";
import {findAll} from "../endpoints/chats";
import {chatsQueryKeys} from "../query-keys/chats-query-keys";

export function createFindAllChatsQuery() {
    return useQuery({
        queryKey: chatsQueryKeys.all,
        queryFn: () => findAll()
    });
}