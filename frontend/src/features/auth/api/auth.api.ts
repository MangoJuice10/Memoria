import {httpClient} from "@/shared/api";
import {setAccessToken, clearAccessToken} from "@/features/auth/api/token.storage";
import type {RegisterDto} from "@/features/auth/model/register.schema";
import type {LoginDto} from "@/features/auth/model/login.schema";
import type {AccessTokenResponseDto} from "@/features/auth/model/access-token-response.dto.ts";
import type {User} from "@/entities/user";

export async function register(dto: RegisterDto) {
    const {data} = await httpClient.post<AccessTokenResponseDto>("/auth/register", dto);
    setAccessToken(data.accessToken);
    return data;
}

export async function login(dto: LoginDto) {
    const {data} = await httpClient.post<AccessTokenResponseDto>("/auth/login", dto);
    setAccessToken(data.accessToken);
    return data;
}

export async function refresh() {
    const {data} = await httpClient.post<AccessTokenResponseDto>("/auth/refresh");
    setAccessToken(data.accessToken);
    return data;
}

export async function logout() {
    await httpClient.post("/auth/logout");
    clearAccessToken();
}

export async function getCurrentUser() {
    const {data} = await httpClient.get<User>("/users/me");
    return data;
}