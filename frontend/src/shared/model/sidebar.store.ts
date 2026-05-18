import {defineStore} from "pinia";
import {useVisibility} from "@/shared/lib";
import type {VisibilityControls} from "@/shared/model/visibility-controls.type";

export const useSidebarStore = defineStore("sidebar", () => {
    const visibility = useVisibility();
    return {
        ...visibility,
    } satisfies VisibilityControls;
});