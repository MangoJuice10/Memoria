import {useRoute} from "vue-router";
import type {MenuItemView} from "@/shared/config";

export function useNavigation() {
    const route = useRoute();
    const isNavigationLinkActive = (navigationItem: MenuItemView) => {
        return route.name === navigationItem.routeName;
    };

    return {
        isNavigationLinkActive
    };
}