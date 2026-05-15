import {ref} from "vue";
import {defineStore} from "pinia";

export const useLoadingScreenStore = defineStore("loadingScreen", () => {
    const isLoading = ref(true);
    const startLoading = () => {
        isLoading.value = true;
    }
    const stopLoading = () => {
        isLoading.value = false;
    }

    return {
        isLoading,
        startLoading,
        stopLoading
    };
});