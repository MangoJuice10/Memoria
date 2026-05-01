import {useVisibility} from "@/shared/lib";
import {defineStore} from "pinia";
import {ref} from "vue";

export const useBackdropStore = defineStore("backdrop", () => {
    const callback = ref<(() => void) | null>(null);

    const setCallback = (newCallback: () => void) => {
        callback.value = newCallback;
    }

    return {
        callback,
        setCallback,
        ...useVisibility()
    };
});