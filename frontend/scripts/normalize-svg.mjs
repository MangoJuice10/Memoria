import fs from "fs";
import path from "path";

const ICON_DIR = "./src/components/icons";

const replacements = [
    {regex: /#fff\b|#ffffff\b/gi, value: "var(--color-icon-primary)"},
    {regex: /#000\b|#000000\b/gi, value: "var(--color-icon-secondary)"},
    {regex: /currentColor\b/g, value: "var(--color-icon-secondary)"}
];

// Use when you absolutely need to add a particular class to the inline SVG.
// Otherwise, inject the class into the component on spot, when using the component.
function addSvgClass(svg, className) {
    if (/<svg[^>]*\bclass\s*=/.test(svg)) {
        return svg.replace(
            /<svg([^>]*?)\bclass\s*=\s*(['"])(.*?)\2/,
            (match, before, quote, classes) => {
                const classList = classes.trim().split(/\s+/);

                if (classList.includes(className)) {
                    return match;
                }

                return `<svg${before}class=${quote}${className} ${classList.join(" ")}${quote}`;
            }
        );
    }

    return svg.replace(/<svg\b/, `<svg class="${className}"`);
}

function processFile(filePath) {
    let svg = fs.readFileSync(filePath, "utf8");

    replacements.forEach(({regex, value}) => {
        svg = svg.replace(regex, value);
    });

    // svg = addSvgClass(svg, "icon");

    fs.writeFileSync(filePath, svg);
    console.log(`✔ Processed: ${filePath}`);
}

function walk(dir) {
    for (const entry of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, entry);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        }
        if (fullPath.endsWith(".vue")) processFile(fullPath);
    }
}

walk(ICON_DIR);