import { AUTH_STATUS_QUERY_KEY } from "@/lib/authConstants";
import { updateUserPassword, updateUserProfile } from "@/services/ApiRequests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (profileDetails: {
            firstName?: string;
            lastName?: string;
            username: string;
        }) => updateUserProfile({ ...profileDetails }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: AUTH_STATUS_QUERY_KEY,
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
            toast.success("User Profile updated");
        },
        onError: (err: any) => {
            toast.error(
                err.response.data.error.message ||
                    "Failed to update user profile",
            );
        },
    });
};

export const useUpdateUserPassword = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userPasswords: {
            currentPassword: string;
            newPassword: string;
        }) => updateUserPassword({ ...userPasswords }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: AUTH_STATUS_QUERY_KEY,
            });

            toast.success("User Password updated");
        },
        onError: (err: any) => {
            toast.error(
                err.response.data.error.message ||
                    "Failed to update user password",
            );
        },
    });
};
