export const educationalResourcesQueryKeys = {
    all: ["educational-resources"] as const,
    byId: (educationalResourceId: number) => ["educational-resources", {educationalResourceId}] as const,
    byDeck: (deckId: number) => ["educational-resources", {deckId}] as const,
};
