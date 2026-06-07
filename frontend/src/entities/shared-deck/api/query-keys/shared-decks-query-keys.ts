export const sharedDecksQueryKeys = {
    all: ["shared-decks"] as const,
    list: (minRating?: number) => ["shared-decks", "list", { minRating }] as const,
    detail: (id: number) => ["shared-decks", "detail", { id }] as const,
};
