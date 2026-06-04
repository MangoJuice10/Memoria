import type {
    DraftFlashcard, FlashcardData,
} from "@/entities/flashcard/model/types/draft-flashcard.type";
import {
    clearDraftFlashcards,
    getDraftFlashcards,
    setDraftFlashcards
} from "@/entities/flashcard/model/draft-flashcard.storage";
import {defineStore} from "pinia";
import {ref} from "vue";

export class DraftStoreInitializationError extends Error {
    constructor() {
        super("The draft flashcards store hasn't been initialized");
        this.name = "DraftStoreInitializationError";
    }
}

export const useDraftFlashcardStorage = defineStore("draftFlashcards", () => {
    const deckId = ref<number | null>(null);
    const draftFlashcards = ref<DraftFlashcard[]>([]);

    const init = (id: number) => {
        deckId.value = id;
        draftFlashcards.value = getDraftFlashcards(deckId.value);
    };

    const stageCreate = (flashcardData: FlashcardData) => {
        if (!deckId.value) throw new DraftStoreInitializationError();

        const draftFlashcardToCreate: DraftFlashcard = {
            status: "CREATED",
            id: -(Date.now()),
            ...flashcardData,
        };
        draftFlashcards.value.push(draftFlashcardToCreate);
        commit();
    };

    const stageBulkCreate = (flashcardsData: FlashcardData[]) => {
        if (!deckId.value) throw new DraftStoreInitializationError();

        const draftFlashcardsToCreate: DraftFlashcard[] = flashcardsData.map((flashcardData) => ({
            status: "CREATED",
            id: -(Date.now()),
            ...flashcardData
        }));
        draftFlashcards.value.push(...draftFlashcardsToCreate);
        commit();
    };

    const stageUpdate = (flashcardId: number, flashcardData: FlashcardData) => {
        if (!deckId.value) throw new DraftStoreInitializationError();

        const draftFlashcardWithIndex = findDraftFlashcardWithIndex(flashcardId);

        if (draftFlashcardWithIndex) draftFlashcards.value.splice(draftFlashcardWithIndex.index, 1);

        const draftFlashcardToUpdate: DraftFlashcard = {
            status: draftFlashcardWithIndex?.status === "CREATED" ? "CREATED" : "UPDATED",
            id: flashcardId,
            ...flashcardData,
        };

        draftFlashcards.value.push(draftFlashcardToUpdate);
        commit();
    };

    const stageDelete = (flashcardId: number) => {
        if (!deckId.value) throw new DraftStoreInitializationError();

        const draftFlashcardWithIndex = findDraftFlashcardWithIndex(flashcardId);

        if (draftFlashcardWithIndex) draftFlashcards.value.splice(draftFlashcardWithIndex.index, 1);

        if (draftFlashcardWithIndex?.status !== "CREATED") {
            const draftFlashcardToDelete: DraftFlashcard = {
                status: "DELETED",
                id: flashcardId,
            };

            draftFlashcards.value.push(draftFlashcardToDelete);
        }
        commit();
    };

    const unstage = (flashcardId: number) => {
        if (!deckId.value) throw new DraftStoreInitializationError();

        const draftFlashcardWithIndex = findDraftFlashcardWithIndex(flashcardId);
        if (draftFlashcardWithIndex) draftFlashcards.value.splice(draftFlashcardWithIndex.index, 1);
        commit();
    };

    const commit = () => {
        if (!deckId.value) throw new DraftStoreInitializationError();
        setDraftFlashcards(deckId.value, draftFlashcards.value);
    };

    const clear = () => {
        if (!deckId.value) throw new DraftStoreInitializationError();
        draftFlashcards.value = [];
        clearDraftFlashcards(deckId.value);
    };

    const findDraftFlashcardWithIndex = (flashcardId: number): {
        index: number;
    } & DraftFlashcard | null => {
        const draftFlashcardIdx = draftFlashcards.value.findIndex((draftFlashcards) => draftFlashcards.id === flashcardId);
        if (draftFlashcardIdx === -1) return null;

        const draftFlashcard = draftFlashcards.value[draftFlashcardIdx];
        if (!draftFlashcard) return null;

        return {
            index: draftFlashcardIdx,
            ...draftFlashcard
        };
    };

    return {
        init,
        draftFlashcards,
        stageCreate,
        stageBulkCreate,
        stageUpdate,
        stageDelete,
        unstage,
        clear
    };
});