import type {Ref, UnwrapRef} from "vue";

export type VisibilityControls = {
    isVisible: Ref<boolean>;
    show: (...args: any[]) => void;
    hide: (...args: any[]) => void;
    toggle: (...args: any[]) => void;
}

export type StoreVisibilityControls = UnwrapRef<VisibilityControls>;