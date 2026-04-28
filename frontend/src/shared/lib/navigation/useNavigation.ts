import {useRoute} from "vue-router";
import type {NavigationItemView} from "@/shared/config";

export function useNavigation() {
    const route = useRoute();
    const isNavigationLinkActive = (navigationItem: NavigationItemView) => {
        return route.name === navigationItem.routeName;
    };

    return {
        isNavigationLinkActive
    };
}