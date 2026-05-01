import {defineStore} from "pinia";
import {useVisibility} from "@/shared/lib";

export const useSidebarStore = defineStore("sidebar", () => {
    return useVisibility()
});