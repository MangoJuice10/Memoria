import {useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import * as authApi from "@/features/auth/api/auth.api";
import type {LoginDto} from "@/features/auth/model/login.schema";
import type {RegisterDto} from "@/features/auth/model/register.schema";

export const authQueryKeys = {
    me: ["auth", "me"] as const,
};

export function useCurrentUserQuery(enabled = true) {
    return useQuery({
        queryKey: authQueryKeys.me,
        queryFn: authApi.getCurrentUser,
        enabled
    });
}

export function useLoginMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (loginDto: LoginDto) => authApi.login(loginDto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: authQueryKeys.me});
        }
    });
}

export function useRegisterMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (registerDto: RegisterDto) => authApi.register(registerDto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: authQueryKeys.me});
        }
    });
}

export function useLogoutMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            queryClient.removeQueries({queryKey: authQueryKeys.me});
        }
    });
}