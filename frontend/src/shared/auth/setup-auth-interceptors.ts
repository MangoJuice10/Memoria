import axios from "axios";
import {client, type SuccessResponse} from "@/shared/api";
import {
    getAccessToken,
    setAccessToken,
    clearAccessToken
} from "@/shared/auth/token.storage.ts";
import type {AccessTokenResponseDto} from "@/shared/api";

const baseUrl = import.meta.env.VITE_API_URL as string;

let refreshTokenPromise: Promise<string | null> | null = null;

function isAuthError(error: any) {
    return error.response && error.response.status === 401;
}

function isAuthRoute(url: string) {
    return url.includes("/auth/login")
        || url.includes("/auth/register")
        || url.includes("/auth/refresh");
}

export function setupAuthInterceptors() {
    client.interceptors.request.use(
        (config) => {
            const token = getAccessToken();
            if (token) config.headers.Authorization = `Bearer ${token}`;
            return config;
        }
    );

    client.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            const originalRequestUrl = originalRequest.url ?? "";

            if (!isAuthError(error)) return Promise.reject(error);

            if (isAuthRoute(originalRequestUrl)) return Promise.reject(error);

            if (!refreshTokenPromise) {
                refreshTokenPromise = axios
                    .post<SuccessResponse<AccessTokenResponseDto>>(
                        `${baseUrl}/auth/refresh`,
                        {},
                        {withCredentials: true}
                    )
                    .then((response) => {
                        const newToken = response.data.data.accessToken as string;
                        setAccessToken(newToken);
                        return newToken;
                    })
                    .catch(() => {
                        clearAccessToken();
                        return null;
                    });
            }

            const newToken = await refreshTokenPromise;

            if (!newToken) return Promise.reject(error);

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return client(originalRequest);
        }
    );
}