import {client} from "@/shared/api";
import {setAccessToken, clearAccessToken} from "@/shared/auth/token.storage.ts";
import type {RegisterDto} from "@/entities/viewer/model/register.schema.ts";
import type {LoginDto} from "@/entities/viewer/model/login.schema.ts";
import type {SuccessResponse} from "@/shared/api/response.types";
import type {AccessTokenResponseDto} from "../dto/access-token-response.dto";

export async function register(registerDto: RegisterDto): Promise<AccessTokenResponseDto> {
    const {data: {data}} = await client.post<SuccessResponse<AccessTokenResponseDto>>("/auth/register", registerDto);
    setAccessToken(data.accessToken);
    return data;
}

export async function login(loginDto: LoginDto): Promise<AccessTokenResponseDto> {
    const {data: {data}} = await client.post<SuccessResponse<AccessTokenResponseDto>>("/auth/login", loginDto);
    setAccessToken(data.accessToken);
    return data;
}

export async function refresh(): Promise<AccessTokenResponseDto> {
    const {data: {data}} = await client.post<SuccessResponse<AccessTokenResponseDto>>("/auth/refresh");
    setAccessToken(data.accessToken);
    return data;
}

export async function logout() {
    await client.post("/auth/logout");
    clearAccessToken();
}