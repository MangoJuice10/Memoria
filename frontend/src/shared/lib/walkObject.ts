export const walkObject = (obj: unknown, callback: (path: string) => void, path = "") => {
    if (obj === null || typeof obj !== "object") {
        if (path) callback(path);
        return;
    }

    const keys = Object.keys(obj);

    if (keys.length === 0) {
        if (path) callback(path);
        return;
    }

    for (const key of keys) {
        const newPath = path ? `${path}.${key}` : key;
        walkObject((obj as Record<string, any>)[key], callback, newPath);
    }
};