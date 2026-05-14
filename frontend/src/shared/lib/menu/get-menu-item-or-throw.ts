import type {MenuItemView} from "@/shared/config";

export function getMenuItemViewOrThrow<ItemId extends string | number>(menuItemViews: MenuItemView<ItemId>[], targetId: ItemId) {
    const item = menuItemViews.find(({id}) => id === targetId);
    if (!item) throw new Error(`Menu item with the id "${targetId}" doesn't exist`);
    return item;
}