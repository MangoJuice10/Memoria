import {defineStore} from "pinia";
import type {User} from "@/entities/user";
import * as authApi from "@/features/auth/api/auth.api";
import {clearAccessToken} from "@/features/auth/api/token.storage";

type AuthState = {
    user: User | null;
    isInitialized: boolean;
}

export const useAuthStore = defineStore("auth", {
    state: (): AuthState => ({
        user: null,
        isInitialized: false,
    }),

    getters: {
        isAuthenticated: (state: AuthState) => state.user !== null
    },

    actions: {
        setUser(user: User | null) {
            this.user = user;
        },

        async fetchCurrentUser() {
            this.user = await authApi.getCurrentUser();
            return this.user;
        },

        async initializeAuth() {
            try {
                await authApi.refresh();
                this.user = await authApi.getCurrentUser();
            } catch {
                clearAccessToken();
                this.user = null;
            } finally {
                this.isInitialized = true;
            }
        },

        async register(email: string, password: string, confirmPassword: string) {
            await authApi.register({email, password, confirmPassword});
            this.user = await authApi.getCurrentUser();
        },

        async login(email: string, password: string) {
            await authApi.login({email, password});
            this.user = await authApi.getCurrentUser();
        },

        async logout() {
            try {
                await authApi.logout();
            } finally {
                clearAccessToken();
                this.user = null;
            }
        }
    }
});