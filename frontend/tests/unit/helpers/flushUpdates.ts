import {vi} from "vitest";
import type {VueWrapper} from "@vue/test-utils";
import flushPromises from "flush-promises";

export const flushUpdates = async (wrapper: VueWrapper) => {
    await flushPromises();
    if (vi.isFakeTimers()) await vi.runAllTimersAsync();
    await wrapper.vm.$nextTick();
};