import {client} from "@/shared/api/client.ts";
import type {Viewer} from "@/entities/viewer/model/Viewer.type.ts";
import type {UpdateMeDto} from "@/shared/model/schemas/updateMe.schema.ts";
import type {SuccessResponse} from "@/shared/api";

export async function updateMe(updateUserDto: UpdateMeDto): Promise<Viewer> {
    const {data: {data}} = await client.patch<SuccessResponse<Viewer>>("/users/me", updateUserDto);
    return data;
}