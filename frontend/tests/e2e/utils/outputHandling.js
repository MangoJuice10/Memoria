"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanScreenshots = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var url_1 = require("url");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1.default.dirname(__filename);
var outputDir = path_1.default.join(__dirname, "../output");
var cleanScreenshots = function () {
    if (fs_1.default.existsSync(outputDir)) {
        try {
            fs_1.default.readdirSync(outputDir).forEach(function (file) {
                fs_1.default.unlinkSync(path_1.default.join(outputDir, file));
            });
        }
        catch (err) {
        }
    }
};
exports.cleanScreenshots = cleanScreenshots;
