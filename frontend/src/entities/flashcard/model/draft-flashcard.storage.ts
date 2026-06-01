import type {DraftFlashcard} from "./types/draft-flashcard.type";

const storageKey = (deckId: number) => `draft-flashcards:${deckId}`;

export function getDraftFlashcards(deckId: number): DraftFlashcard[] {
    const rawFlashcardDrafts = localStorage.getItem(storageKey(deckId));
    if (!rawFlashcardDrafts) return [];

    try {
        return JSON.parse(rawFlashcardDrafts);
    } catch (error) {
        return [];
    }
}

export function setDraftFlashcards(deckId: number, drafts: DraftFlashcard[]) {
    if (drafts.length === 0) localStorage.removeItem(storageKey(deckId));
    else localStorage.setItem(storageKey(deckId), JSON.stringify(drafts));
}

export function clearDraftFlashcards(deckId: number) {
    localStorage.removeItem(storageKey(deckId));
}