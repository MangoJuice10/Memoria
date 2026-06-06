import type {Viewer} from "@/entities/viewer";
import {client, type SuccessResponse} from "@/shared/api";

export async function removeAvatar(): Promise<Viewer> {
    const {data: {data}} = await client.delete<SuccessResponse<Viewer>>(`/users/me/avatar`);
    return data;
}