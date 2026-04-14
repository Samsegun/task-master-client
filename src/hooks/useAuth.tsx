import type {
    LoginUserCredentials,
    RegisterUserCredentials,
    ResetPasswordCredentials,
} from "@/lib/apiTypes";
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
import { useLocation, useNavigate } from "react-router";

export const AUTH_STATUS_QUERY_KEY = ["authStatus"] as const;

export const useRegisterUser = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ email, password, username }: RegisterUserCredentials) =>
            registerUser(email, password, username),
        onSuccess: () => {
            navigate("/email-verification-sent");
        },
        onError: (err: any) => {
            toast.error(err.response.data.error.message);
        },
    });
};

export const useSignin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();

    return useMutation({
        mutationFn: ({ emailOrusername, password }: LoginUserCredentials) =>
            loginUser(emailOrusername, password),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: AUTH_STATUS_QUERY_KEY,
            });

            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
        },
        onError: (err: any) => {
            toast.error(err.response.data.error.message);
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
        onError: (err: any) => {
            toast.error(err.response.data.error.message);
        },
    });
};

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: ({
            email,
        }: Omit<RegisterUserCredentials, "password" | "username">) =>
            forgotPassword(email),
        onSuccess: response => {
            toast.success(response.data.message, { duration: 8000 });
        },
        onError: (err: any) => {
            toast.error(err.response.data.error.message);
        },
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
        onError: (err: any) => {
            toast.error(err.response.data.error.message);
        },
    });
};

export const useAuthStatus = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: AUTH_STATUS_QUERY_KEY,
        queryFn: checkAuthStatus,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 15 * 60 * 1000, // 15 mins
    });

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            // clear the user from cache and redirect to login
            queryClient.clear();
            navigate("/login");
        },
    });

    const user = data?.data.success ? data.data : null;
    let customErr: { message: string; code: string } | null = null;

    if (isError) {
        customErr = (error as any).response.data.error;
    }

    return {
        user: user?.data,
        isLoading,
        isAuthenticated: !!user,
        isError,
        error,
        customErr,
        logout: logoutMutation,
    };
};
