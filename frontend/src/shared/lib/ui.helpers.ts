import type {StoreVisibilityControls} from "@/shared/model";

export function showOne(
    storeToShow: StoreVisibilityControls,
    ...storesToHide: StoreVisibilityControls[]
) {
    for (let store of storesToHide) {
        store.hide();
    }
    storeToShow.show();
}

export function hideAll(
    ...stores: StoreVisibilityControls[]
) {
    for (let store of stores) {
        store.hide();
    }
}