import type {ValidationError} from "@/types/ValidationError";

export type Rule<T> = (value: T) => ValidationError;