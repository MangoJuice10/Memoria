import {useRoute} from "vue-router";
import type {MenuItemView, NavigationItemId} from "@/shared/config";

export function useNavigation() {
    const route = useRoute();
    const isNavigationLinkActive = (navigationItem: MenuItemView<NavigationItemId>) => {
        return route.name === navigationItem.routeName;
    };

    return {
        isNavigationLinkActive
    };
}