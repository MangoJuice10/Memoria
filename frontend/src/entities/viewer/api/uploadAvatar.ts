import type {Viewer} from "@/entities/viewer";
import {client, type SuccessResponse} from "@/shared/api";

export async function uploadAvatar(file: File): Promise<Viewer> {
    const formData = new FormData();
    formData.append("file", file);

    const {data: {data}} = await client.post<SuccessResponse<Viewer>>(
        "/users/me/avatar",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return data;
}