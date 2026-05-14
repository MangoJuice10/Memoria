export const decksQueryKeys = {
    all: ["decks"] as const,
    byId: (deckId: number) => ["decks", {deckId}] as const,
};