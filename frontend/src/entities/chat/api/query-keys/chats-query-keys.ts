export const chatsQueryKeys = {
    all: ["chats"] as const,
    byId: (chatId: number) => ["chats", {chatId}] as const,
};