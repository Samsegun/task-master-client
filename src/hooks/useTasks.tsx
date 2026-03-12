import type { MyTasks } from "@/lib/apiTypes";
import { getMyTasks } from "@/services/ApiRequests";
import { useQuery } from "@tanstack/react-query";

export const useGetMyTasks = (opts?: { limit?: number }) => {
    const limit = opts?.limit ?? 3;

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["myTasks", limit],
        queryFn: () => getMyTasks({ limit, sort: "createdAt:desc" }),
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 60 * 1000,
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
