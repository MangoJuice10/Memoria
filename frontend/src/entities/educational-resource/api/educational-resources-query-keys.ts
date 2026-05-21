export const educationalResourcesQueryKeys = {
    all: ["educational-resources"] as const,
    byId: (deckId: number) => ["educational-resources", {deckId}] as const,
};