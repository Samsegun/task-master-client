import type { MyTasks } from "@/lib/apiTypes";
import { getMyTasks } from "@/services/ApiRequests";
import { useQuery } from "@tanstack/react-query";

export const useGetMyTasks = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["myTasks"],
        queryFn: getMyTasks,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: Infinity,
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
