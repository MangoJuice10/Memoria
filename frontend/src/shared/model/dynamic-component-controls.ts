import {type Ref, type Component, type UnwrapRef} from "vue";

export type DynamicComponentControls = {
    component: Ref<Component | null>;
    props: Ref<Record<string, unknown>>;

    getComponent: () => Component | null;
    setComponent: (newComponent: Component) => void;
    clearComponent: () => void;

    getProps: () => Record<string, unknown>;
    setProps: (props: Record<string, unknown>) => void;
    clearProps: () => void;
}

export type StoreDynamicComponentControls = UnwrapRef<DynamicComponentControls>;