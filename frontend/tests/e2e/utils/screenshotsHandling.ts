import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const screenshotsDir = path.join(__dirname, "../screenshots");

export const screenshotsHandling = () => {
    if (fs.existsSync(screenshotsDir)) {
        try {
            fs.readdirSync(screenshotsDir).forEach((file) => {
                fs.unlinkSync(path.join(screenshotsDir, file));
            });
        } catch (err) {
        }
    }
};