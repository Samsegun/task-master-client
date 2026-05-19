import type {
    LoginUserCredentials,
    RegisterUserCredentials,
    ResetPasswordCredentials,
} from "@/lib/apiTypes";
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
import toast from "react-hot-toast";
import { useLocation, useNavigate, useSearchParams } from "react-router";

export const AUTH_STATUS_QUERY_KEY = ["authStatus"] as const;

export const useRegisterUser = () => {
    const navigate = useNavigate();
    // const location = useLocation();

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
            const params = new URLSearchParams(location.search);
            const returnUrl = params.get("returnUrl");

            if (returnUrl && returnUrl.startsWith("/")) {
                navigate(returnUrl, { replace: true });
                return;
            }

            await queryClient.invalidateQueries({
                queryKey: AUTH_STATUS_QUERY_KEY,
            });

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
        customErr = (error as any).response?.data?.error;
    }

    // only treat as authentication failure if it's a specific auth error
    // network errors, timeouts, and server errors should NOT trigger logout
    const isAuthError = isError && isAuthenticationError(error);

    return {
        user: user?.data,
        isLoading,
        isAuthenticated: !!user,
        isAuthError,
        isError,
        error,
        customErr,
        logout: logoutMutation,
    };
};
