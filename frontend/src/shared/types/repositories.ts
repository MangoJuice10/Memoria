import type {Publication} from "@/entities/Publication/model/Publication.types.ts";

export interface Repositories<T> {
    get(id: string): Promise<T | null>;
    getAll(): Promise<T[] | null>;
    create(entity: T): Promise<void>;
    update(entity: Partial<T>): Promise<void>;
    delete(id: string): Promise<void>;
}

