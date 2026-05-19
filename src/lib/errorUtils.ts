interface ApiErrorResponse {
    error?: {
        message?: string;
        code?: string;
    };
}

interface AxiosErrorType {
    response?: {
        data?: ApiErrorResponse;
        status?: number;
    };
    message?: string;
}

/**
 * Safely extract error message from API error response
 * Returns generic message if error structure is malformed
 */
export const getErrorMessage = (error: unknown): string => {
    try {
        const axiosError = error as AxiosErrorType;

        // Try to get API error message
        if (
            axiosError?.response?.data?.error?.message &&
            typeof axiosError.response.data.error.message === "string"
        ) {
            return axiosError.response.data.error.message;
        }

        // fallback to generic message
        return "Something went wrong. Please try again.";
    } catch {
        return "Something went wrong. Please try again.";
    }
};

export const isAuthenticationError = (error: unknown): boolean => {
    // we treat these specific codes as auth failures
    const authErrorCodes = ["TOKEN_INVALID", "TOKEN_MISSING", "AUTH_FAILED"];

    try {
        const axiosError = error as AxiosErrorType;

        if (
            !authErrorCodes.includes(
                axiosError?.response?.data?.error?.code as string,
            )
        ) {
            return false;
        }

        const errorCode = axiosError?.response?.data?.error?.code;

        return authErrorCodes.includes(errorCode as string);
    } catch {
        return false;
    }
};
