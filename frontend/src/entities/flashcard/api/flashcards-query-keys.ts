export const flashcardsQueryKeys = {
    all: ["flashcards"] as const,
    byDeck: (deckId: number) => ["flashcards", {deckId}] as const,
    byId: (deckId: number, flashcardId: number) => ["flashcards", {deckId, flashcardId}] as const,
    dueByDeck: (deckId: number) => ["flashcards", "due", {deckId}] as const
};