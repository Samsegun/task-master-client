import type { ResetPasswordCredentials, UserCredentials } from "@/lib/apiTypes";
import {
    forgotPassword,
    registerUser,
    resetPassword,
    verifyEmail,
} from "@/services/ApiRequests";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

// export const AUTH_STATUS_QUERY_KEY = ["authStatus"] as const;

export const useRegisterUser = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ email, password }: UserCredentials) =>
            registerUser(email, password),
        onSuccess: () => {
            navigate("/email-verification-sent");
        },
        onError: (err: any) => {
            console.log(err);
            toast.error(err.response.data.message);
        },
    });
};

export const useVerifyEmail = () => {
    // const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ token }: { token: string }) => verifyEmail(token),
        onSuccess: async response => {
            toast.success(response.data.message);

            // await queryClient.invalidateQueries({
            //     queryKey: AUTH_STATUS_QUERY_KEY,
            // });
        },
        onError: err => toast.error(err.message),
    });
};

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: ({ email }: Omit<UserCredentials, "password">) =>
            forgotPassword(email),
        onSuccess: response => {
            toast.success(response.data.message);
        },
        onError: err => toast.error(err.message),
    });
};

export const useResetPassword = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ token, password }: ResetPasswordCredentials) =>
            resetPassword(token, password),
        onSuccess: (response, variables) => {
            toast.success(response.data.message);

            navigate(`/login?email=${encodeURIComponent(variables.email)}`);
        },
        onError: err => toast.error(err.message),
    });
};
