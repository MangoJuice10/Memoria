import {useRoute} from "vue-router";
import type {MenuItem, MenuItemView} from "@/shared/config";

export function useNavigation() {
    const route = useRoute();
    const isNavigationLinkActive = (navigationItem: MenuItem<string | number> | MenuItemView<string | number>) => {
        const routeName = route.name;
        if (!routeName) return false;

        const navigationItemRouteName = navigationItem.routeName;
        if (!navigationItemRouteName) return false;

        if (!routeName.toString().startsWith(navigationItemRouteName)) return false;

        if (!navigationItem.routeParams) return true;

        return Object.entries(navigationItem.routeParams).every(([key, value]) => {
            return route.params[key] === value;
        });
    };

    return {
        isNavigationLinkActive
    };
}