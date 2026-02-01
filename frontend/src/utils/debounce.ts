export function debounce<F extends (...args: any[]) => void>(f: F, delay: number = 300) {
    let timer: number | undefined;
    return (...args: Parameters<F>) => {
        if (timer !== undefined) clearTimeout(timer);
        timer = window.setTimeout(() => f(...args), delay);
    }
}