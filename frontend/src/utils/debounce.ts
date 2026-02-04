import type {DebouncedFunction} from "@/types/DebouncedFunction";

/*
The parameter is a function object that may have an arbitrary number of
parameters, as well as a returned value. The returned value will be ignored.
*/
export function debounce<F extends (...args: any[]) => void>(f: F, delay: number = 300): DebouncedFunction<F> {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const debounced = (...args: Parameters<F>) => {
        if (timer !== undefined) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = undefined;
            f(...args);
        }, delay);
    };

    debounced.cancel = () => {
        if (timer !== undefined) {
            clearTimeout(timer);
            timer = undefined;
        }
    };

    return debounced;
}