import {defineStore} from "pinia";
import {useDynamicComponent, useVisibility} from "@/shared/lib";
import {type Component} from "vue";
import type {VisibilityControls} from "@/shared/model/visibility-controls.type";
import type {DynamicComponentControls} from "@/shared/model/dynamic-component-controls.ts";

type SidebarStoreControls =
    VisibilityControls
    & Pick<DynamicComponentControls, "getComponent">
    & Pick<DynamicComponentControls, "getProps">

export const useSidebarStore = defineStore("sidebar", () => {
    const visibility = useVisibility();
    const {getComponent, getProps, ...dynamicComponent} = useDynamicComponent();

    const show = (newComponent: Component, newProps: Record<string, unknown> = {}) => {
        visibility.show();
        dynamicComponent.setComponent(newComponent);
        dynamicComponent.setProps(newProps);
    };

    const hide = () => {
        visibility.hide();
        dynamicComponent.clearComponent();
        dynamicComponent.clearProps();
    };

    return {
        ...visibility,
        getComponent,
        getProps,
        show,
        hide
    } satisfies SidebarStoreControls;
});