import {defineStore} from "pinia";
import type {VisibilityControls} from "@/shared/model/visibility-controls.type.ts";
import {useVisibility} from "@/shared/lib";

export const useChatStore = defineStore("chat", () => {
    const visibility = useVisibility();
    return {
        ...visibility
    } satisfies VisibilityControls;
});