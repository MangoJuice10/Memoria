import {ref, type Ref, type UnwrapRef} from "vue";
import {defineStore} from "pinia";
import {useVisibility} from "@/shared/lib";
import type {VisibilityControls} from "@/shared/model/visibility-controls.type";

export type BackdropVisibilityControls = VisibilityControls & {
    callback: Ref<(() => void) | null>;
    setCallback: (newCallback: () => void) => void;
}

export type StoreBackdropVisibilityControls = UnwrapRef<BackdropVisibilityControls>;

export const useBackdropStore = defineStore("backdrop", () => {
    const callback = ref<(() => void) | null>(null);

    const setCallback = (newCallback: () => void) => {
        callback.value = newCallback;
    };

    return {
        ...useVisibility(),
        callback,
        setCallback,
    } satisfies BackdropVisibilityControls;
});