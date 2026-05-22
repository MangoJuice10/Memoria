export type DebouncedFunction<F extends (...args: any[]) => any> = {
    (...args: Parameters<F>): Promise<Awaited<ReturnType<F>>>;
    cancel: () => void;
}

export class DebounceCancelledError extends Error {
    constructor() {
        super("Debounced call cancelled");
        this.name = "DebounceCancelledError";
    }
}

export function debounce<F extends (...args: any[]) => any>(
    fn: F,
    delay = 300
): DebouncedFunction<F> {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let lastReject: ((reason: any) => void) | undefined;

    const debounced = (...args: Parameters<F>): Promise<Awaited<ReturnType<F>>> => {
        if (timer) {
            clearTimeout(timer);
            lastReject?.(new DebounceCancelledError());
        }

        return new Promise((resolve, reject) => {
            lastReject = reject;
            timer = setTimeout(() => {
                timer = undefined;
                try {
                    resolve(fn(...args));
                } catch (err) {
                    reject(err);
                }
            }, delay);
        });
    };

    debounced.cancel = () => {
        if (timer) {
            clearTimeout(timer);
            timer = undefined;
            lastReject?.(new DebounceCancelledError());
        }
    };

    return debounced;
}