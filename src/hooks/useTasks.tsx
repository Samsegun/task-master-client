import type { MyTasks, Tasks } from "@/lib/apiTypes";
import { getMyTasks, getTasks } from "@/services/ApiRequests";
import { useQuery } from "@tanstack/react-query";

export const useGetMyTasks = (opts?: { limit?: number }) => {
    const limit = opts?.limit ?? 3;

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["myTasks", limit],
        queryFn: () => getMyTasks({ limit, sort: "createdAt:desc" }),
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    let tasks: MyTasks | undefined;
    let customErr: { message: string; code: string } | null = null;

    if (isError) {
        customErr = (error as any).response.data.error;
    }

    if (!isError) {
        tasks = data?.data;
    }

    return {
        myTasks: tasks?.tasks,
        isLoading,
        isError,
        error,
        customErr,
    };
};

export const useGetTasks = (projectId?: string, opts?: { limit?: number }) => {
    const enabled = Boolean(projectId);
    const limit = opts?.limit ?? 5;

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["tasks", projectId, limit],
        queryFn: () => getTasks(projectId!, { limit, sort: "createdAt:desc" }),
        enabled, // don't run when no id
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    let tasks: Tasks | undefined;
    let customErr: { message: string; code: string } | null = null;

    if (isError) {
        customErr = (error as any).response.data.error;
    }

    if (!isError) {
        tasks = data?.data;
    }

    return {
        tasks: tasks?.tasks,
        isLoading,
        isError,
        error,
        customErr,
    };
};
