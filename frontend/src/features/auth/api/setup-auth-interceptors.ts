import axios from "axios";
import {httpClient} from "@/shared/api";
import {
    getAccessToken,
    setAccessToken,
    clearAccessToken
} from "@/features/auth/api/token.storage.ts";

let refreshPromise: Promise<string | null> | null = null;

export function setupAuthInterceptors() {
    httpClient.interceptors.request.use(
        (config) => {
            const token = getAccessToken();
            if (token) config.headers.Authorization = `Bearer ${token}`;
            return config;
        }
    );

    httpClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // TODO
            if (!error.response
                || error.response.status !== 401
                || originalRequest?._retry)
                return Promise.reject(error);

            // TODO
            const url = originalRequest.url ?? "";

            if (url.includes("/auth/login")
                || url.includes("/auth/register")
                || url.includes("/auth/refresh")) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            if (!refreshPromise) {
                refreshPromise = axios
                    .post(
                        `${import.meta.env.VITE_API_URL}/auth/refresh`,
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
                    })
                    .finally(() => {
                        refreshPromise = null;
                    });
            }

            const newToken = await refreshPromise;

            if (!newToken) {
                return Promise.reject(error);
            }

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return httpClient(originalRequest);
        }
    );
}