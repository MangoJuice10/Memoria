import {type Component, ref} from "vue";
import {defineStore} from "pinia";
import {useVisibility} from "@/shared/lib";

export const useModalStore = defineStore("modal", () => {
    const component = ref<Component | null>(null);
    const props = ref<Record<string, unknown>>({});

    const visibility = useVisibility();

    const show = (newComponent: Component, newProps: Record<string, unknown> = {}) => {
        visibility.show();
        component.value = newComponent;
        props.value = newProps;
    };

    const hide = () => {
        visibility.hide();
        component.value = null;
        props.value = {};
    };

    return {
        component,
        props,
        isVisible: visibility.isVisible,
        show,
        hide
    };
});