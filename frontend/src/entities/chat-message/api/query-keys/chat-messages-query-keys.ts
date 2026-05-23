export const chatMessagesQueryKeys = {
    byChat: (chatId: number, search?: string) => search
        ? ["chat-messages", {chatId, search}] as const
        : ["chat-messages", {chatId}] as const,
    byId: (chatId: number, chatMessageId: number) => ["chat-messages", {chatId, chatMessageId}] as const,
};