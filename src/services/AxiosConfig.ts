import axios, {
    AxiosError,
    type AxiosRequestConfig,
    type AxiosResponse,
} from "axios";
import { queryClient } from "../lib/QueryClient";
import { AUTH_STATUS_QUERY_KEY } from "../lib/authConstants";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

interface ApiErrorResponse {
    error?: {
        code?: string;
        message?: string;
    };
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createApiClient = () =>
    axios.create({
        baseURL: API_BASE_URL,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

const axiosInstance = createApiClient();
const refreshTokenClient = createApiClient();

let refreshTokenPromise: Promise<void> | null = null;

const getErrorCode = (error: AxiosError) => {
    const data = error.response?.data as ApiErrorResponse | undefined;
    return data?.error?.code;
};

const isRefreshTokenAuthError = (error: unknown) => {
    if (!axios.isAxiosError(error)) return false;

    return [
        "REFRESH_TOKEN_EXPIRED",
        "REFRESH_TOKEN_INVALID",
        "REFRESH_TOKEN_MISSING",
    ].includes(getErrorCode(error) ?? "");
};

const redirectToLogin = () => {
    queryClient.removeQueries({ queryKey: AUTH_STATUS_QUERY_KEY });
    queryClient.clear();

    if (window.location.pathname !== "/login") {
        window.location.assign("/login");
    }
};

const refreshAccessToken = async () => {
    if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenClient
            .post("/auth/refresh-token")
            .then(() => undefined)
            .finally(() => {
                refreshTokenPromise = null;
            });
    }

    return refreshTokenPromise;
};

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as
            | CustomAxiosRequestConfig
            | undefined;

        if (!error.response || !originalRequest) {
            return Promise.reject(error);
        }

        if (
            error.response.status === 401 &&
            getErrorCode(error) === "TOKEN_EXPIRED" &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                await refreshAccessToken();
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                if (isRefreshTokenAuthError(refreshError)) {
                    redirectToLogin();
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
