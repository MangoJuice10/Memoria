export const feedbackQueryKeys = {
    all: ["feedback"] as const,
    byDeck: (sharedDeckId: number) => ["feedback", {sharedDeckId}] as const,
};
