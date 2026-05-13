import {client} from "@/shared/api/client.ts";
import type {Viewer} from "@/entities/viewer/model/viewer.type.ts";
import type {SuccessResponse} from "@/shared/api";

export async function getMe(): Promise<Viewer> {
    const {data: {data}} = await client.get<SuccessResponse<Viewer>>("/users/me");
    return data;
}