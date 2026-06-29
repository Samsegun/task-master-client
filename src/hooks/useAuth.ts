import type {
    LoginUserCredentials,
    RegisterUserCredentials,
    ResetPasswordCredentials,
} from "@/lib/apiTypes";
import { AUTH_STATUS_QUERY_KEY } from "@/lib/authConstants";
import { getErrorMessage, isAuthenticationError } from "@/lib/errorUtils";
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
import { useMemo } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useSearchParams } from "react-router";

export const useRegisterUser = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({
            email,
            password,
            invitationToken,
        }: RegisterUserCredentials) =>
            registerUser(email, password, invitationToken),
        onSuccess: () => {
            navigate(`/email-verification-sent`);
        },
        onError: (err: any) => {
            toast.error(getErrorMessage(err));
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

            const params = new URLSearchParams(location.search);
            const returnUrl = params.get("returnUrl");

            if (returnUrl && returnUrl.startsWith("/")) {
                navigate(returnUrl, { replace: true });
                return;
            }

            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
        },
        onError: (err: any) => {
            toast.error(getErrorMessage(err));
        },
    });
};

export const useVerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            token,
            invitationToken,
        }: {
            token: string;
            invitationToken?: string | null;
        }) => verifyEmail(token, invitationToken),
        onSuccess: async (response) => {
            const params = new URLSearchParams(searchParams);
            const invitationToken = params.get("invitationToken");
            if (invitationToken) {
                // send user back to the invite-processing page (backend expects `token` param there)
                window.location.href = `/process-invitation?token=${encodeURIComponent(invitationToken)}`;
                toast.success(`${response.data.message} Redirecting...`, {
                    duration: 8000,
                });

                return;
            }

            toast.success(response.data.message);

            await queryClient.invalidateQueries({
                queryKey: AUTH_STATUS_QUERY_KEY,
            });
        },
        onError: (err: any) => {
            toast.error(getErrorMessage(err));
        },
    });
};

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: ({
            email,
        }: Omit<RegisterUserCredentials, "password" | "username">) =>
            forgotPassword(email),
        onSuccess: (response) => {
            toast.success(response.data.message, { duration: 8000 });
        },
        onError: (err: any) => {
            toast.error(getErrorMessage(err));
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
            toast.error(getErrorMessage(err));
        },
    });
};

export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutUser,
        onSettled: () => {
            queryClient.clear();
            navigate("/login", { replace: true });
        },
    });
};

export const useAuthStatus = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: AUTH_STATUS_QUERY_KEY,
        queryFn: checkAuthStatus,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 15 * 60 * 1000, // 15 mins
        gcTime: 30 * 60 * 1000,
        select: (response) => response.data,
    });

    const user = data?.success ? data.data : null;
    const customErr = isError
        ? ((error as any).response?.data?.error as {
              message: string;
              code: string;
          } | null)
        : null;

    // only treat as authentication failure if it's a specific auth error
    // network errors, timeouts, and server errors should NOT trigger logout
    const isAuthError = isError && isAuthenticationError(error);

    return useMemo(
        () => ({
            user,
            isLoading,
            isAuthenticated: !!user,
            isAuthError,
            isError,
            error,
            customErr,
        }),
        [customErr, error, isAuthError, isError, isLoading, user],
    );
};
