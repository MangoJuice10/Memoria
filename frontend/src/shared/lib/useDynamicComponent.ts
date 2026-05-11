import type {DynamicComponentControls} from "@/shared/model";
import {type Component, markRaw, ref, shallowRef} from "vue";

export function useDynamicComponent(): DynamicComponentControls {
    const component = shallowRef<Component | null>(null);
    const props = ref<Record<string, unknown>>({});

    const getComponent = () => component.value;

    const setComponent = (newComponent: Component) => {
        component.value = markRaw(newComponent);
    };

    const clearComponent = () => {
        component.value = null;
    };

    const getProps = () => props.value;

    const setProps = (newProps: Record<string, unknown>) => {
        props.value = newProps;
    };

    const clearProps = () => {
        props.value = {};
    };

    return {
        component,
        props,
        getComponent,
        setComponent,
        clearComponent,
        getProps,
        setProps,
        clearProps
    };
}