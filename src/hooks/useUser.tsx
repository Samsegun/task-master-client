import { updateUserPassword, updateUserProfile } from "@/services/ApiRequests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (profileDetails: {
            firstName?: string;
            lastName?: string;
            username?: string;
        }) => updateUserProfile({ ...profileDetails }),
        onSuccess: async (_data, variables) => {
            console.log(variables);
        },
        onError: (err: any) => {
            toast.error(
                err.response.data.error.message ||
                    "Failed to update user profile"
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
        onSuccess: async (_data, variables) => {
            console.log(variables);
        },
        onError: (err: any) => {
            toast.error(
                err.response.data.error.message ||
                    "Failed to update user password"
            );
        },
    });
};
