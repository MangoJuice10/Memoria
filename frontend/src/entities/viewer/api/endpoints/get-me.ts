import {client} from "@/shared/api/client";
import type {Viewer} from "@/entities/viewer/model/Viewer.type";

export async function getMe(): Promise<Viewer> {
    const {data} = await client.get<Viewer>("/users/me");
    return data;
}