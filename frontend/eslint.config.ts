import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import {defineConfig} from "eslint/config";
import path from "path";
import {fileURLToPath} from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
        plugins: {js},
        extends: ["js/recommended"],
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                project: path.join(__dirname, "tsconfig.json"),
                tsconfigRootDir: __dirname
            }
        },
        rules: {
            "no-empty": "off"
        }
    },

    tseslint.configs.recommended,
    pluginVue.configs["flat/essential"],

    {
        files: ["**/*.ts", "**/*.vue"],
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
        }
    },

    {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
    {files: ["**/*.json"], plugins: {json}, language: "json/json", extends: ["json/recommended"]},
    {files: ["**/*.jsonc"], plugins: {json}, language: "json/jsonc", extends: ["json/recommended"]},
    {files: ["**/*.json5"], plugins: {json}, language: "json/json5", extends: ["json/recommended"]},
    {files: ["**/*.md"], plugins: {markdown}, language: "markdown/gfm", extends: ["markdown/recommended"]},
    {files: ["**/*.css"], plugins: {css}, language: "css/css", extends: ["css/recommended"]},
]);
