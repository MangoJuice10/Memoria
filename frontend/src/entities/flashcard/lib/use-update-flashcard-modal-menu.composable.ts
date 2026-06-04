import {defineAsyncComponent} from "vue";
import type {Composer} from "vue-i18n";
import {useMenu} from "@/shared/lib";
import {useModalStore} from "@/shared/model";
import type {DisplayFlashcard} from "../model/types/display-flashcard.type";
import type {MenuItemCallback, MenuItemIsActive, TabItemId} from "@/shared/config";
import {
    UPDATE_TOUCHED_FLASHCARD_LAYOUT,
    UPDATE_FLASHCARD_LAYOUT
} from "../config/update-flashcard-layout.config";

export type UpdateFlashcardModalTab = Extract<TabItemId, "update-flashcard" | "regenerate-flashcard" | "split-flashcard">

export function useUpdateFlashcardModalMenu(activeTab: UpdateFlashcardModalTab, flashcard: DisplayFlashcard, t: Composer["t"]) {
    const modalStore = useModalStore();

    const switchToUpdateFlashcardModal = () => {
        const updateFlashcardModal = defineAsyncComponent(() => import("../ui/modals/UpdateFlashcardModal.vue"));
        modalStore.show(updateFlashcardModal, {
            flashcard
        });
    };

    const switchToRegenerateFlashcardModal = () => {
        const regenerateFlashcardModal = defineAsyncComponent(() => import("../ui/modals/RegenerateFlashcardModal.vue"));
        modalStore.show(regenerateFlashcardModal, {
            flashcard
        });
    };

    const switchToSplitFlashcardModal = () => {
        const splitFlashcardModal = defineAsyncComponent(() => import("../ui/modals/SplitFlashcardModal.vue"));
        modalStore.show(splitFlashcardModal, {
            flashcard
        });
    };

    const isFlashcardTouched = () => {
        return flashcard.status === "CREATED" || flashcard.status === "UPDATED";
    };

    const callbacks = {
        "update-flashcard": switchToUpdateFlashcardModal,
        "regenerate-flashcard": switchToRegenerateFlashcardModal,
        "split-flashcard": switchToSplitFlashcardModal,
    } satisfies Record<UpdateFlashcardModalTab, MenuItemCallback>;

    const isActives = {
        "update-flashcard": activeTab === "update-flashcard",
        "regenerate-flashcard": activeTab === "regenerate-flashcard",
        "split-flashcard": activeTab === "split-flashcard",
    } satisfies Record<UpdateFlashcardModalTab, MenuItemIsActive>;

    const layout = isFlashcardTouched() ? UPDATE_TOUCHED_FLASHCARD_LAYOUT : UPDATE_FLASHCARD_LAYOUT;

    const {menuItemViews} = useMenu(layout, t, callbacks, isActives);

    return {
        menuItemViews
    };
}