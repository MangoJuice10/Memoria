import {defineStore} from "pinia";
import type {Viewer} from "@/entities/viewer";
import {auth} from "@/shared/api";
import {getMe} from "@/entities/viewer/api/endpoints/get-me";
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
                this.viewer = await getMe();
            } catch {
                clearAccessToken();
                this.viewer = null;
            } finally {
                this.isInitialized = true;
            }
        },

        async register(email: string, password: string, confirmPassword: string) {
            await auth.register({email, password, confirmPassword});
            this.viewer = await getMe();
        },

        async login(email: string, password: string) {
            await auth.login({email, password});
            this.viewer = await getMe();
        },

        async logout() {
            try {
                await auth.logout();
            } finally {
                this.resetViewer();
            }
        },

        async fetchViewer() {
            this.viewer = await getMe();
            return this.viewer;
        },

        resetViewer() {
            clearAccessToken();
            this.viewer = null;
        }
    }
});