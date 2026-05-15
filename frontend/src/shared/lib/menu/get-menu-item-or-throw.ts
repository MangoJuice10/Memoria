import type {MenuItemView} from "@/shared/config";

export function getMenuItemViewOrThrow<T extends MenuItemView<any>>(menuItemViews: T[], targetId: T["id"]) {
    const item = menuItemViews.find(({id}) => id === targetId);
    if (!item) throw new Error(`Menu item with the id "${targetId}" doesn't exist`);
    return item;
}