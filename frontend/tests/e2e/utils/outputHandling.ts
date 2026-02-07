import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, "../output");

export const cleanScreenshots = () => {
    if (fs.existsSync(outputDir)) {
        try {
            fs.readdirSync(outputDir).forEach((file) => {
                fs.unlinkSync(path.join(outputDir, file));
            });
        } catch (err) {
        }
    }
};