import {ref, shallowRef, type Component, type Ref, type UnwrapRef, markRaw} from "vue";
import {defineStore} from "pinia";
import {useVisibility} from "@/shared/lib";
import type {VisibilityControls} from "./VisibilityControls.type";

export type ModalVisibilityControls = VisibilityControls & {
    component: Ref<Component | null>;
    props: Ref<Record<string, unknown>>;
}

export type StoreModalVisibilityControls = UnwrapRef<ModalVisibilityControls>;

export const useModalStore = defineStore("modal", () => {
    const component = shallowRef<Component | null>(null);
    const props = ref<Record<string, unknown>>({});

    const visibility = useVisibility();

    const show = (newComponent: Component, newProps: Record<string, unknown> = {}) => {
        visibility.show();
        component.value = markRaw(newComponent);
        props.value = newProps;
    };

    const hide = () => {
        visibility.hide();
        component.value = null;
        props.value = {};
    };

    return {
        ...visibility,
        component,
        props,
        show,
        hide,
    } satisfies ModalVisibilityControls;
});