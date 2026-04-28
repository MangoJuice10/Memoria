import {client} from "@/shared/api/client.ts";
import type {Viewer} from "@/entities/viewer/model/Viewer.type.ts";

export async function users(): Promise<Viewer> {
    const {data} = await client.get<Viewer>("/users/me");
    return data;
}