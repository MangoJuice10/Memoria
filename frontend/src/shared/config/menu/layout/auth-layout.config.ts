import type {MenuLayout, AuthId} from "../../menu.config";
import {authItemCodes} from "../codes/navigation-item-codes.config";

export const AUTH_LAYOUT = {
    menuItems: [
        {
            id: "login",
            routeName: "login",
            labelCode: authItemCodes.AUTH_ITEM_LOGIN
        },
        {
            id: "register",
            routeName: "register",
            labelCode: authItemCodes.AUTH_ITEM_REGISTER
        }
    ],
    menuSections: []
} satisfies MenuLayout<any, AuthId>;