export function asset(imageRelativePath: string) {
    // Using template literal syntax yields undefined in place of imageRelativePath
    return new URL("../assets/" + imageRelativePath, import.meta.url).href;
}