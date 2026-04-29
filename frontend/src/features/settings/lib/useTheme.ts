import {ref, watch, onMounted} from "vue";
import type {Theme} from "../model/Theme";

export const useTheme = () => {
    const theme = ref<Theme>(
        (localStorage.getItem("theme") as Theme) ??
        (window.matchMedia("prefers-color-scheme: light").matches
            ? "light"
            : "dark")
    );

    const toggleTheme = () => {
        theme.value = theme.value === "light" ? "dark" : "light";
    };

    const applyTheme = (value: Theme) => {
        document.documentElement.setAttribute("data-theme", value);
    };

    watch(theme, (value) => {
        localStorage.setItem("theme", value);
        applyTheme(value);
    });

    onMounted(() => {
        applyTheme(theme.value);
    });

    return {
        theme,
        toggleTheme,
    };
};