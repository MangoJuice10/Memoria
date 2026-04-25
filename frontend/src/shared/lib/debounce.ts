export type DebouncedFunction<F extends (...args: any[]) => void> = {
    (...args: Parameters<F>): void;
    cancel: () => void;
}

export const debounce = <F extends (...args: any[]) => void> (fn: F, delay = 300): DebouncedFunction<F> => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const debounced = (...args: Parameters<F>) => {
        if (timer !== undefined) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = undefined;
            fn(...args);
        }, delay);
    };

    debounced.cancel = () => {
        if (timer !== undefined) {
            clearTimeout(timer);
            timer = undefined;
        }
    }

    return debounced;
}