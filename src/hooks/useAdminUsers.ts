import type { AllUsers, User } from "@/lib/apiTypes";
import { getAllUsers, getUser } from "@/services/ApiRequests";
import { useQuery } from "@tanstack/react-query";

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
