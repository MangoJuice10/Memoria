export type PaginationParams = {
    page?: number;
    pageSize?: number;
}

export type PaginatedResult<T> = {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}

export const DEFAULT_PAGINATION_PARAMS = {
    page: 1,
    pageSize: 10,
} satisfies PaginationParams;