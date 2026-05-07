import axios, {
    AxiosError,
    type AxiosRequestConfig,
    type AxiosResponse,
} from "axios";
import { queryClient } from "../lib/QueryClient";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

interface ApiErrorResponse {
    error: {
        code: string;
        message: string;
    };
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// concurrency management
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
}> = [];

const processQueue = (error: AxiosError | null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (!error.response || !originalRequest) {
            return Promise.reject(error);
        }

        const data = error.response?.data as ApiErrorResponse;
        const errorCode = data?.error?.code;

        if (error.response.status === 401) {
            if (errorCode === "TOKEN_EXPIRED" && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                        .then(() => axiosInstance(originalRequest))
                        .catch(err => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    await axiosInstance.post("/auth/refresh-token");

                    processQueue(null);
                    isRefreshing = false;

                    return axiosInstance(originalRequest);
                } catch (refreshError: any) {
                    isRefreshing = false;
                    processQueue(refreshError);

                    const refreshErrorCode =
                        refreshError?.response?.data?.error?.code;

                    if (
                        refreshErrorCode === "REFRESH_TOKEN_EXPIRED" ||
                        refreshErrorCode === "REFRESH_TOKEN_INVALID" ||
                        refreshErrorCode === "REFRESH_TOKEN_MISSING"
                    ) {
                        queryClient.clear();
                        window.location.href = "/login";
                    }

                    return Promise.reject(refreshError);
                }
            }

            if (
                errorCode === "TOKEN_INVALID" ||
                errorCode === "TOKEN_MISSING" ||
                errorCode === "AUTH_FAILED"
            ) {
                return Promise.reject(error);
            }
        }

        // all other errors (404, 500 and others)
        return Promise.reject(error);
    }
);

export default axiosInstance;
