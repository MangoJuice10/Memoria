export const tagsQueryKeys = {
    all: ["tags"] as const,
    byDeck: (deckId: number) => ["tags", {deckId}] as const,
    my: () => ["tags", "my"] as const,
};
