import {ref} from "vue";

const isBackdropVisible = ref(false);
const showBackdrop = () => isBackdropVisible.value = true;
const hideBackdrop = () => isBackdropVisible.value = false;
const toggleBackdrop = () => isBackdropVisible.value = !isBackdropVisible.value;

export const useBackdrop = () => {
    return {
        isBackdropVisible: isBackdropVisible,
        showBackdrop: showBackdrop,
        hideBackdrop: hideBackdrop,
        toggleBackdrop: toggleBackdrop,
    };
};