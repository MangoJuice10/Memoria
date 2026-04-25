"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("@playwright/test");
require("@tests/e2e/expect");
var path_1 = require("path");
var url_1 = require("url");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1.default.dirname(__filename);
var outputDir = path_1.default.join(__dirname, "tests/e2e/output");
exports.default = (0, test_1.defineConfig)({
    testDir: "tests/e2e",
    outputDir: outputDir,
    use: {
        baseURL: "http://localhost:5173",
        headless: true,
        screenshot: "only-on-failure",
        video: "retain-on-failure",
    }
});
