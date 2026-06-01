export type FlashcardData = {
    front: string;
    back: string;
};

export type DraftFlashcardStatus = "CREATED" | "UPDATED" | "DELETED";

export type DraftBase = {
    status: DraftFlashcardStatus;
    id: number;
};

export type DraftCreatedFlashcard = DraftBase
    & { status: "CREATED"; }
    & FlashcardData

export type DraftUpdatedFlashcard = DraftBase
    & { status: "UPDATED"; }
    & FlashcardData

export type DraftDeletedFlashcard = DraftBase
    & { status: "DELETED"; }

export type DraftFlashcard = DraftCreatedFlashcard | DraftUpdatedFlashcard | DraftDeletedFlashcard;