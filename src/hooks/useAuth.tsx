import type { ResetPasswordCredentials, UserCredentials } from "@/lib/apiTypes";
import {
    checkAuthStatus,
    forgotPassword,
    loginUser,
    logoutUser,
    registerUser,
    resetPassword,
    verifyEmail,
} from "@/services/ApiRequests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const AUTH_STATUS_QUERY_KEY = ["authStatus"] as const;

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

export const useSignin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ email, password }: UserCredentials) =>
            loginUser(email, password),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: AUTH_STATUS_QUERY_KEY,
            });
        },
        onError: (err: any) => {
            toast.error(err.response.data.message);
        },
    });
};

export const useVerifyEmail = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ token }: { token: string }) => verifyEmail(token),
        onSuccess: async response => {
            toast.success(response.data.message);

            await queryClient.invalidateQueries({
                queryKey: AUTH_STATUS_QUERY_KEY,
            });
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

export const useAuthStatus = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        data: user,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: AUTH_STATUS_QUERY_KEY,
        queryFn: checkAuthStatus,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 5, // data fresh for 5 mins
    });

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            // clear the user from cache and redirect
            queryClient.clear();
            navigate("/login");
        },
    });

    // Debugging logs
    if (isLoading) console.log("Status: Loading...");
    if (isError) console.log("Status: Error", error); // Likely a 401 or 403
    if (user) console.log("Status: Success", user);

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        isError,
        error,
        logout: logoutMutation,
    };
};
