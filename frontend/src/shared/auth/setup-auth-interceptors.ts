import axios from "axios";
import {client} from "@/shared/api";
import {
    getAccessToken,
    setAccessToken,
    clearAccessToken
} from "@/shared/auth/token.storage.ts";

const baseUrl = import.meta.env.VITE_API_URL as string;

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

            const newToken = axios
                .post(
                    `${baseUrl}/auth/refresh`,
                    {},
                    {withCredentials: true}
                )
                .then((response) => {
                    const newToken = response.data.accessToken as string;
                    setAccessToken(newToken);
                    return newToken;
                })
                .catch(() => {
                    clearAccessToken();
                    return null;
                });

            if (!newToken) return Promise.reject(error);

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return client(originalRequest);
        }
    );
}