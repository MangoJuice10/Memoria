import {z} from "zod";
import {en, ru} from "zod/locales";

export type ZodLocale = "en" | "ru";

const zodErrorMaps: Record<ZodLocale, typeof en> = {
    en: en,
    ru: ru,
};

export const setZodLocale = async (zodLocale: ZodLocale) => {
    z.config(zodErrorMaps[zodLocale]());
};