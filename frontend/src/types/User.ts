import type { LanguageCode } from "@/types/LanguageCode.ts";
import type { Role } from "@/types/Role.ts";

export type User = {
    id: number;
    email: string;
    language: LanguageCode;
    roles: Role[];
    isActive: boolean;
}