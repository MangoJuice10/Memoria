import {ref, watch} from "vue";
import {debounce, DebounceCancelledError} from "@/shared/lib/debounce.ts";

export type SearchOptions = {
    delay: number;
}

export function useSearch(options?: SearchOptions) {
    const optionsWithDefaults = Object.assign({
        delay: 300
    }, options);

    const search = ref("");
    const committedSearch = ref("");

    const commitSearchDebounced = debounce((value: string) => {
        committedSearch.value = value;
    }, optionsWithDefaults.delay);

    watch(search, (value) => {
        commitSearchDebounced(value).catch((err) => {
            if (err instanceof DebounceCancelledError) return;
            throw err;
        });
    });

    return {
        search,
        committedSearch,
    };
}