export type Breakpoint =
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl";

export const breakpoints = {
    "sm": window.matchMedia("(min-width: 40rem"),
    "md": window.matchMedia("(min-width: 48rem"),
    "lg": window.matchMedia("(min-width: 64rem)"),
    "xl": window.matchMedia("(min-width: 80rem)"),
    "2xl": window.matchMedia("(min-width: 96rem)"),
} as const satisfies Record<Breakpoint, MediaQueryList>;

export function addBreakpointsListener(handler: () => void) {
    for (const media of Object.values(breakpoints)) media.addEventListener("change", handler);
}

export function removeBreakpointsListener(handler: () => void) {
    for (const media of Object.values(breakpoints)) media.removeEventListener("change", handler);
}