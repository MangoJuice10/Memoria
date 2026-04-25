"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var js_1 = require("@eslint/js");
var globals_1 = require("globals");
var typescript_eslint_1 = require("typescript-eslint");
var eslint_plugin_vue_1 = require("eslint-plugin-vue");
var json_1 = require("@eslint/json");
var markdown_1 = require("@eslint/markdown");
var css_1 = require("@eslint/css");
var config_1 = require("eslint/config");
var path_1 = require("path");
var url_1 = require("url");
var __dirname = path_1.default.dirname((0, url_1.fileURLToPath)(import.meta.url));
exports.default = (0, config_1.defineConfig)([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
        plugins: { js: js_1.default },
        extends: ["js/recommended"],
        languageOptions: {
            globals: globals_1.default.browser,
            parserOptions: {
                project: path_1.default.join(__dirname, "tsconfig.json"),
                tsconfigRootDir: __dirname
            }
        },
        rules: {
            "no-empty": "off"
        }
    },
    typescript_eslint_1.default.configs.recommended,
    eslint_plugin_vue_1.default.configs["flat/essential"],
    {
        files: ["**/*.ts", "**/*.vue"],
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
        }
    },
    { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: typescript_eslint_1.default.parser } } },
    { files: ["**/*.json"], plugins: { json: json_1.default }, language: "json/json", extends: ["json/recommended"] },
    { files: ["**/*.jsonc"], plugins: { json: json_1.default }, language: "json/jsonc", extends: ["json/recommended"] },
    { files: ["**/*.json5"], plugins: { json: json_1.default }, language: "json/json5", extends: ["json/recommended"] },
    { files: ["**/*.md"], plugins: { markdown: markdown_1.default }, language: "markdown/gfm", extends: ["markdown/recommended"] },
    { files: ["**/*.css"], plugins: { css: css_1.default }, language: "css/css", extends: ["css/recommended"] },
]);
