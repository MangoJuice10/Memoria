import {codes} from "@/shared/config/codes.config";
import type {MenuItemId, MenuLayout} from "../../menu.config";

export const AUTH_LAYOUT = {
    menuItems: [
        {
            id: "login",
            routeName: "login",
            labelCode: codes.TAB_ITEM_LOGIN
        },
        {
            id: "register",
            routeName: "register",
            labelCode: codes.TAB_ITEM_REGISTER
        }
    ],
    menuSections: []
} satisfies MenuLayout<any, MenuItemId>;