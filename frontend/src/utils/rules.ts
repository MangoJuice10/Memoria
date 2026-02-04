import type {Rule} from "@/types/Rule";

export const required = (errorMessage: string): Rule<string> => {
    return (value: string) => value.trim() !== "" ? null : errorMessage;
};

export const minLength = (length: number, errorMessage: string): Rule<string> => {
    return (value: string) => value.trim().length >= length ? null : errorMessage;
};

export const email = (errorMessage: string): Rule<string> => {
    return (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : errorMessage;
};

export const between = (min: number, max: number, errorMessage: string): Rule<number> => {
    return (value: number) => value >= min && value <= max ? null : errorMessage;
}

export const rules = {
    required,
    minLength,
    email,
    between
}