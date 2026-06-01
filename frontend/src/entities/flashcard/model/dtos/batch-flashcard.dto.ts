import type {DraftFlashcard} from "../../model/types/draft-flashcard.type";

export function createBatchFlashcardDto(drafts: DraftFlashcard[]) {
    const draftFlashcardsToCreate = drafts
        .filter((draftFlashcard) => draftFlashcard.status === "CREATED")
        .map(({status, id, ...createFlashcardDto}) => createFlashcardDto);

    const draftFlashcardsToUpdate = drafts
        .filter((draftFlashcard) => draftFlashcard.status === "UPDATED")
        .map(({status, ...updateFlashcardDto}) => updateFlashcardDto);

    const draftFlashcardsToDelete = drafts
        .filter((draftFlashcard) => draftFlashcard.status === "DELETED")
        .map(({id}) => id);

    return {
        create: draftFlashcardsToCreate,
        update: draftFlashcardsToUpdate,
        delete: draftFlashcardsToDelete
    } as const;
}

export type BatchFlashcardDto = ReturnType<typeof createBatchFlashcardDto>