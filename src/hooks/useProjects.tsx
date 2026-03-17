import type { Project, ProjectMembers, Projects } from "@/lib/apiTypes";
import {
    getProject,
    getProjectMembers,
    getProjects,
} from "@/services/ApiRequests";
import { useQuery } from "@tanstack/react-query";

export const useGetProjects = (opts?: { limit?: number }) => {
    const limit = opts?.limit ?? 3;

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["projects", limit],
        queryFn: () => getProjects({ limit, sort: "updatedAt:desc" }),
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 5 * 60 * 1000,
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

export const useGetProject = (projectId?: string) => {
    const enabled = Boolean(projectId);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => getProject(projectId!),
        enabled, // don't run when no id
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    let project: Project | undefined;
    let customErr: { message: string; code: string } | null = null;

    if (isError) {
        customErr = (error as any).response.data.error;
    }

    if (!isError) {
        project = data?.data;
    }

    return {
        userProject: project?.project,
        isLoading,
        isError,
        error,
        customErr,
    };
};

export const useGetProjectMembers = (projectId?: string) => {
    const enabled = Boolean(projectId);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["projectMembers", projectId],
        queryFn: () => getProjectMembers(projectId!),
        enabled,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    let projectMembers: ProjectMembers | undefined;
    let customErr: { message: string; code: string } | null = null;

    if (isError) {
        customErr = (error as any).response.data.error;
    }

    if (!isError) {
        projectMembers = data?.data;
    }

    return {
        members: projectMembers?.projectMembers,
        isLoading,
        isError,
        error,
        customErr,
    };
};
