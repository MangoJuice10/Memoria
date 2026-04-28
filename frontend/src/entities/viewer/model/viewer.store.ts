import {defineStore} from "pinia";
import type {Viewer} from "@/entities/viewer";
import {auth} from "@/shared/api";
import {users} from "@/shared/api/endpoints/users.ts";
import {clearAccessToken} from "@/shared/auth";

type ViewerState = {
    viewer: Viewer | null;
    isInitialized: boolean;
}

export const useViewerStore = defineStore("viewer", {
    state: (): ViewerState => ({
        viewer: null,
        isInitialized: false,
    }),

    getters: {
        isAuthenticated: (state: ViewerState) => state.viewer !== null
    },

    actions: {
        async initialize() {
            try {
                await auth.refresh();
                this.viewer = await users();
            } catch {
                clearAccessToken();
                this.viewer = null;
            } finally {
                this.isInitialized = true;
            }
        },

        async register(email: string, password: string, confirmPassword: string) {
            await auth.register({email, password, confirmPassword});
            this.viewer = await users();
        },

        async login(email: string, password: string) {
            await auth.login({email, password});
            this.viewer = await users();
        },

        async logout() {
            try {
                await auth.logout();
            } finally {
                this.resetViewer();
            }
        },

        resetViewer() {
            this.viewer = null;
        }
    }
});