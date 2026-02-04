import type {VueWrapper} from "@vue/test-utils";

export function getByTestId(wrapper: VueWrapper<any>, testId: string) {
    const el = wrapper.find(`[data-testid="${testId}"]`);
    if (!el.exists()) {
        throw new Error(`No element found with data-testid="${testId}"`);
    }
    return el;
}