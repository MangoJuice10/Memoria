import {client} from "@/shared/api";
import {setAccessToken, clearAccessToken} from "@/shared/auth/token.storage.ts";
import type {RegisterDto} from "@/shared/model/schemas/register.schema.ts";
import type {LoginDto} from "@/shared/model/schemas/login.schema.ts";

export type AccessTokenResponseDto = {
    accessToken: string;
}

export async function register(dto: RegisterDto): Promise<AccessTokenResponseDto> {
    const {data} = await client.post<AccessTokenResponseDto>("/auth/register", dto);
    setAccessToken(data.accessToken);
    return data;
}

export async function login(dto: LoginDto): Promise<AccessTokenResponseDto> {
    const {data} = await client.post<AccessTokenResponseDto>("/auth/login", dto);
    setAccessToken(data.accessToken);
    return data;
}

export async function refresh(): Promise<AccessTokenResponseDto> {
    const {data} = await client.post<AccessTokenResponseDto>("/auth/refresh");
    setAccessToken(data.accessToken);
    return data;
}

export async function logout() {
    await client.post("/auth/logout");
    clearAccessToken();
}