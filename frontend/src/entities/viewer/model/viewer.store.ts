import {defineStore} from "pinia";
import {uploadAvatar, type Viewer} from "@/entities/viewer";
import {auth} from "@/shared/api";
import {getMe} from "../api/getMe";
import {updateMe} from "../api/updateMe";
import {clearAccessToken} from "@/shared/auth";
import type {RegisterDto, LoginDto, UpdateMeDto} from "@/shared/model";

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

        async register(registerDto: RegisterDto) {
            console.log(registerDto);
            await auth.register(registerDto);
            this.viewer = await getMe();
        },

        async login(loginDto: LoginDto) {
            await auth.login(loginDto);
            this.viewer = await getMe();
        },

        async logout() {
            try {
                await auth.logout();
            } catch {
            } finally {
                this.resetViewer();
            }
        },

        async updateMe(updateUserDto: UpdateMeDto) {
            this.viewer = await updateMe(updateUserDto);
        },

        async uploadAvatar(file: File) {
            this.viewer = await uploadAvatar(file);
        },

        resetViewer() {
            this.viewer = null;
        }
    }
});