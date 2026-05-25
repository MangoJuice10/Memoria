import type {InjectionKey} from "vue";

export const resizableNaturalResizeKey: InjectionKey<() => void> = Symbol("resizable:natural-resize");