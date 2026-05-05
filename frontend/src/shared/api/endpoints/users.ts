import {client} from "@/shared/api/client.ts";
import type {Viewer} from "@/entities/viewer/model/Viewer.type.ts";
import type {UpdateMeDto} from "@/shared/model/schemas/updateMe.schema.ts";

export async function getMe(): Promise<Viewer> {
    const {data} = await client.get<Viewer>("/users/me");
    return data;
}

export async function updateMe(updateUserDto: UpdateMeDto): Promise<Viewer> {
    const {data} = await client.patch<Viewer>("/users/me", updateUserDto);
    return data;
}