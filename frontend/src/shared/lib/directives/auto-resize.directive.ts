import type {Directive} from "vue";

const handlerMap = new WeakMap<HTMLTextAreaElement, () => void>();

function resize(el: HTMLTextAreaElement) {
    const style = getComputedStyle(el);

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)}px`;
}

export const vAutoResize: Directive<HTMLTextAreaElement> = {
    mounted(el) {
        const handler = () => resize(el);
        handlerMap.set(el, handler);

        el.addEventListener("input", handler);
        resize(el);
    },

    updated(el) {
        resize(el);
    },

    unmounted(el) {
        const handler = handlerMap.get(el);
        if (!handler) return;

        el.removeEventListener("input", handler);
        handlerMap.delete(el);
    }
};