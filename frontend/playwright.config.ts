import {defineConfig} from "@playwright/test";
import "@tests/e2e/expect";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const screenshotsDir = path.join(__dirname, "tests/e2e/screenshots");

export default defineConfig({
    testDir: "tests/e2e",
    outputDir: screenshotsDir,
    use: {
        baseURL: "http://localhost:5173",
        headless: true,
        screenshot: "only-on-failure"
    }
});