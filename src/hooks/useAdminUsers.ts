import type { AllUsers, Role, User } from "@/lib/apiTypes";
import {
    getAllUsers,
    getUser,
    updateUserRole,
    updateUserSuspension,
} from "@/services/ApiRequests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const ADMIN_USERS_QUERY_KEY = ["adminUsers"] as const;

export const useGetAllUsers = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ADMIN_USERS_QUERY_KEY,
        queryFn: () => getAllUsers(),
        staleTime: 60 * 1000, // stale time should be short as users can be updated frequently
    });

    let users: AllUsers | undefined;
    let customErr: { message: string; code: string } | null = null;

    if (isError) {
        customErr = (error as any).response.data.error;
    }

    if (!isError) {
        users = data?.data;
    }

    return {
        users: users?.data,
        isLoading,
        isError,
        error,
        customErr,
    };
};

export const useGetUser = (userId: string) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [...ADMIN_USERS_QUERY_KEY, userId],
        queryFn: () => getUser(userId),
        enabled: !!userId,
        staleTime: 60 * 1000,
    });

    let user: User | undefined;
    let customErr: { message: string; code: string } | null = null;

    if (isError) {
        customErr = (error as any).response.data.error;
    }

    if (!isError) {
        user = data?.data;
    }

    return {
        user: user?.data,
        isLoading,
        isError,
        error,
        customErr,
    };
};

export const useUpdateUserRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, role }: { userId: string; role: Role }) =>
            updateUserRole(userId, role),
        onSuccess: async (_response, variables) => {
            toast.success("User role updated successfully");

            await queryClient.invalidateQueries({
                queryKey: ADMIN_USERS_QUERY_KEY,
            });

            await queryClient.invalidateQueries({
                queryKey: [...ADMIN_USERS_QUERY_KEY, variables.userId],
            });
        },
        onError: (err: any) => {
            toast.error(
                err.response.data.error.message || "Something went wrong",
            );
        },
    });
};

export const useUpdateUserSuspension = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            userId,
            isSuspended,
        }: {
            userId: string;
            isSuspended: boolean;
        }) => updateUserSuspension(userId, isSuspended),
        onSuccess: async (_response, variables) => {
            toast.success("User updated successfully");

            await queryClient.invalidateQueries({
                queryKey: ADMIN_USERS_QUERY_KEY,
            });

            await queryClient.invalidateQueries({
                queryKey: [...ADMIN_USERS_QUERY_KEY, variables.userId],
            });
        },
        onError: (err: any) => {
            toast.error(
                err.response.data.error.message || "Something went wrong",
            );
        },
    });
};
