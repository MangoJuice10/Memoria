import {CREATE_FLASHCARD_LAYOUT} from "@/entities/flashcard/config/create-flashcard-layout.config";
import flashcard from "@/pages/review/ui/Flashcard.vue";
import {defineAsyncComponent} from "vue";
import type {Composer} from "vue-i18n";
import {useMenu} from "@/shared/lib";
import {useModalStore} from "@/shared/model";
import type {MenuItemCallback, MenuItemIsActive, TabItemId} from "@/shared/config";

export type UpdateFlashcardModalTab = Extract<TabItemId, "create-flashcard" | "generate-flashcard">

export function useCreateFlashcardModalMenu(activeTab: UpdateFlashcardModalTab, t: Composer["t"]) {
    const modalStore = useModalStore();

    const switchToCreateFlashcardModal = () => {
        const createFlashcardModal = defineAsyncComponent(() => import("../ui/modals/CreateFlashcardModal.vue"));
        modalStore.show(createFlashcardModal, {
            flashcard
        });
    };

    const switchToGenerateFlashcardModal = () => {
        const generateFlashcardModal = defineAsyncComponent(() => import("../ui/modals/GenerateFlashcardModal.vue"));
        modalStore.show(generateFlashcardModal, {
            flashcard
        });
    };

    const callbacks = {
        "create-flashcard": switchToCreateFlashcardModal,
        "generate-flashcard": switchToGenerateFlashcardModal,
    } satisfies Record<UpdateFlashcardModalTab, MenuItemCallback>;

    const isActives = {
        "create-flashcard": activeTab === "create-flashcard",
        "generate-flashcard": activeTab === "generate-flashcard",
    } satisfies Record<UpdateFlashcardModalTab, MenuItemIsActive>;

    const layout = CREATE_FLASHCARD_LAYOUT;

    const {menuItemViews} = useMenu(layout, t, callbacks, isActives);

    return {
        menuItemViews
    };
}