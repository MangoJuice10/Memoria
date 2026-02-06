import {defineConfig} from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
    plugins: [
        vue()
    ],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: [
            "tests/vitest.setup.ts"
        ],
        exclude: [
            "**/node_modules/**",
            "**/dist/**",
            "**/tests/e2e/**"
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@tests": path.resolve(__dirname, "tests"),
        }
    }
});