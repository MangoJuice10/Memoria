export type DebouncedFunction<F extends (...args: any[]) => void> = {
    (...args: Parameters<F>): void;
    cancel: () => void;
}