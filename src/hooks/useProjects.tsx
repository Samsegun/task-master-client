import type { Projects } from "@/lib/apiTypes";
import { getProjects } from "@/services/ApiRequests";
import { useQuery } from "@tanstack/react-query";

export const useGetProjects = (opts?: { limit?: number }) => {
    const limit = opts?.limit ?? 3;

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["projects", limit],
        queryFn: () => getProjects({ limit, sort: "updatedAt:desc" }),
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 60 * 1000,
    });

    let projects: Projects | undefined;
    let customErr: { message: string; code: string } | null = null;

    if (isError) {
        customErr = (error as any).response.data.error;
    }

    if (!isError) {
        projects = data?.data;
    }

    return {
        userProjects: projects?.projects,
        isLoading,
        isError,
        error,
        customErr,
    };
};
