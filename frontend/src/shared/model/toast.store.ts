import {defineStore} from "pinia";
import {type Component, markRaw, ref} from "vue";
import {
    AddIcon,
    AiGeneratedIcon,
    CheckIcon,
    ClockIcon,
    EditIcon,
    ErrorIcon,
    InfoIcon, RefreshIcon,
    TrashIcon,
    WarningIcon
} from "@/shared/ui";

export type ToastTypeId =
    | "success"
    | "error"
    | "warning"
    | "info";

export type ToastIconId =
    | ToastTypeId
    | "create"
    | "generate"
    | "update"
    | "delete"
    | "batch"
    | "pending";

export const toastIcons = {
    success: markRaw(CheckIcon),
    error: markRaw(ErrorIcon),
    warning: markRaw(WarningIcon),
    info: markRaw(InfoIcon),
    create: markRaw(AddIcon),
    generate: markRaw(AiGeneratedIcon),
    update: markRaw(EditIcon),
    delete: markRaw(TrashIcon),
    batch: markRaw(RefreshIcon),
    pending: markRaw(ClockIcon),
} as const satisfies Record<ToastIconId, Component>;

export type ToastProps = {
    id: number;
    message: string;
    type: ToastTypeId;
    icon: Component;
    duration: number;
}

let baseId = 0;

export const useToastStore = defineStore("toast", () => {
    const toasts = ref<ToastProps[]>([]);

    const push = (message: string, typeId: ToastTypeId = "info", iconId: ToastIconId = typeId, duration = 3000) => {
        const id = baseId++;

        const toast: ToastProps = {
            id,
            message,
            type: typeId,
            icon: toastIcons[iconId],
            duration,
        };
        toasts.value.push(toast);
        setTimeout(() => pop(id), duration);
    };

    const pop = (targetId: number) => {
        toasts.value = toasts.value.filter(({id}) => id !== targetId);
    };

    return {
        toasts,
        push,
        pop
    };
});