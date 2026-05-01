import {ref} from "vue";

export function useVisibility() {
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