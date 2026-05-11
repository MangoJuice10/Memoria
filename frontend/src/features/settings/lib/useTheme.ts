import {ref, watch, onMounted} from "vue";
import type {ThemeType} from "src/features/settings/model/theme.type.ts";

export const useTheme = () => {
    const theme = ref<ThemeType>(
        (localStorage.getItem("theme") as ThemeType) ??
        (window.matchMedia("prefers-color-scheme: light").matches
            ? "light"
            : "dark")
    );

    const toggleTheme = () => {
        theme.value = theme.value === "light" ? "dark" : "light";
    };

    const applyTheme = (value: ThemeType) => {
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