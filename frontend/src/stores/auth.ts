import {defineStore} from "pinia";
import type {User} from "@/types/User.ts";
import type {IAuthService} from "@/services/AuthService";
import {MockAuthService} from "@/services/AuthService";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null as User | null,
        service: new MockAuthService() as IAuthService
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
        isAdmin: (state) => state.user?.roles?.includes("admin") ?? false,
    },
    actions: {
        async login(email: string, password: string) {
            this.user = await this.service.login(email, password);
        },
        async logout() {
            await this.service.logout();
            this.user = null;
        },
        async fetchCurrentUser() {
            this.user = await this.service.getCurrentUser();
        }
    }
});