import {ref} from "vue";

const isOverlayVisible = ref(false);
const showOverlay = () => isOverlayVisible.value = true;
const hideOverlay = () => isOverlayVisible.value = false;
const toggleOverlay = () => isOverlayVisible.value = !isOverlayVisible.value;

export const useOverlay = () => {
    return {
        isOverlayVisible,
        showOverlay,
        hideOverlay,
        toggleOverlay,
    };
};