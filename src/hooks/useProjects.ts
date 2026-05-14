import type {
    Project,
    ProjectMembers,
    ProjectRole,
    Projects,
} from "@/lib/apiTypes";
import type {
    AddMemberDetails,
    ProjectDetails,
    ProjectUpdateDetails,
} from "@/lib/types";
import {
    acceptInvitation,
    // addProjectMember,
    createProject,
    declineInvitation,
    deleteProject,
    getProject,
    getProjectMembers,
    getProjects,
    inviteProjectMember,
    leaveProject,
    removeProjectMember,
    updateMemberRole,
    updateProject,
} from "@/services/ApiRequests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

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
        queryKey: ["projectMembers", projectId, "members"],
        queryFn: () => getProjectMembers(projectId!),
        enabled,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 60 * 1000,
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

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payLoad: ProjectDetails) => createProject(payLoad),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
            toast.success("Project created");
        },
        onError: (err: any) => {
            toast.error(
                err.response.data.error.message || "Failed to create project",
            );
        },
    });
};

export const useAcceptInvitation = () => {
    return useMutation({
        mutationFn: (token: string) => acceptInvitation(token),
        // onSuccess: (_data) => {
        onSuccess: () => {
            toast.success("Invitation accepted!");
            // navigate(`/projects/${data.project.id}`);
        },
        onError: (err: any) => {
            toast.error(
                err.response.data.error.message ||
                    "Failed to process invitation",
            );
        },
    });
};

export const useDeclineInvitation = () => {
    return useMutation({
        mutationFn: (token: string) => declineInvitation(token),
        // onSuccess: (_data) => {
        onSuccess: () => {
            toast.success("Invitation declined!");
            // navigate(`/projects/${data.project.id}`);
        },
        onError: (err: any) => {
            toast.error(
                err.response.data.error.message ||
                    "Failed to process invitation",
            );
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            projectId,
            payLoad,
        }: {
            projectId: string;
            payLoad: ProjectUpdateDetails;
        }) => updateProject(projectId, payLoad),
        onSuccess: async (_data, variables) => {
            const projectId = variables.projectId;

            await queryClient.invalidateQueries({
                queryKey: ["projects"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["project", projectId],
            });

            toast.success("Project updated");
        },
        onError: (err: any) => {
            toast.error(
                err.response.data.error.message || "Failed to update project",
            );
        },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ projectId }: { projectId: string }) =>
            deleteProject(projectId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["projects"],
            });

            navigate("/projects");

            toast.success("Project deleted");
        },
        onError: (err: any) => {
            toast.error(
                err.response.data.error.message || "Failed to delete project",
            );
        },
    });
};

export const useLeaveProject = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ projectId }: { projectId: string }) =>
            leaveProject(projectId),
        onSuccess: async () => {
            navigate("/projects");

            await queryClient.invalidateQueries({
                queryKey: ["projects"],
            });

            navigate("/projects");

            toast.success("Project exit successful");
        },
        onError: (err: any) => {
            toast.error(
                err.response.data.error.message || "Failed to delete project",
            );
        },
    });
};

export const useAddProjectMember = (projectId: string) => {
    // const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payLoad: AddMemberDetails) =>
            // addProjectMember(projectId, payLoad),
            inviteProjectMember(projectId, payLoad),
        onSuccess: async () => {
            // await queryClient.invalidateQueries({
            //     queryKey: ["projectMembers", projectId, "members"],
            // });

            // await queryClient.invalidateQueries({
            //     queryKey: ["project", projectId],
            // });

            // await queryClient.invalidateQueries({
            //     queryKey: ["projects"],
            // });

            // await queryClient.invalidateQueries({
            //     queryKey: ["tasks"],
            // });

            // await queryClient.invalidateQueries({
            //     queryKey: ["myTasks"],
            // });

            // toast.success("Project member added");
            toast.success("An invitation mail has been sent to user");
        },
        onError: (err: any) => {
            toast.error(
                err.response.data.error.message || "Failed to invite Member",
            );
        },
    });
};
export const useRemoveProjectMember = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            projectId,
            userIdToRemove,
        }: {
            projectId: string;
            userIdToRemove: string;
        }) => removeProjectMember(projectId, userIdToRemove),
        onSuccess: async (_data, variables) => {
            const projectId = variables.projectId;

            await queryClient.invalidateQueries({
                queryKey: ["projectMembers", projectId, "members"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["project", projectId],
            });

            await queryClient.invalidateQueries({
                queryKey: ["projects"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["myTasks"],
            });

            toast.success("Project member removed");
        },
        onError: (err: any) => {
            toast.error(
                err.response.data.error.message || "Failed to remove Member",
            );
        },
    });
};

export const useUpdateMemberRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            projectId,
            userIdToUpdate,
            role,
        }: {
            projectId: string;
            userIdToUpdate: string;
            role: ProjectRole;
        }) => updateMemberRole(projectId, userIdToUpdate, role),
        onSuccess: async (_data, variables) => {
            const projectId = variables.projectId;

            await queryClient.invalidateQueries({
                queryKey: ["projectMembers", projectId, "members"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["project", projectId],
            });

            await queryClient.invalidateQueries({
                queryKey: ["projects"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["myTasks"],
            });

            toast.success("Project members updated");
        },
        onError: (err: any) => {
            toast.error(
                err.response.data.error.message ||
                    "Failed to update member role",
            );
        },
    });
};
