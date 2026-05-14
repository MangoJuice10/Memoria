import {ref} from "vue";
import type {VisibilityControls} from "@/shared/model";

export function useVisibility(): VisibilityControls {
    const isVisible = ref(false);

    const show = () => {
        isVisible.value = true;
    };

    const hide = () => {
        isVisible.value = false;
    };

    const toggle = () => {
        isVisible.value = !isVisible.value;
    };

    return {
        isVisible,
        show,
        hide,
        toggle,
    };
}