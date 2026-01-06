import type {
    ForgotPassword,
    LoginUser,
    LogoutUser,
    RegisterUser,
    ResetPassword,
    VerifyEmail,
} from "../lib/apiTypes";
import axiosInstance from "./AxiosConfig";

/* Start of auth requests */
export const registerUser = (email: string, password: string) => {
    return axiosInstance.post<RegisterUser>("/auth/register", {
        email,
        password,
    });
};

export const loginUser = (email: string, password: string) => {
    return axiosInstance.post<LoginUser>("/auth/login", {
        email,
        password,
    });
};

export const logoutUser = () => {
    return axiosInstance.post<LogoutUser>("/auth/logout");
};

export const forgotPassword = (email: string) => {
    return axiosInstance.post<ForgotPassword>("/auth/forgot-password", {
        email,
    });
};

export const resetPassword = (token: string, password: string) => {
    return axiosInstance.post<ResetPassword>("/auth/reset-password", {
        token,
        password,
    });
};

export const verifyEmail = (token: string) => {
    return axiosInstance.get<VerifyEmail>(`/auth/verify-email?token=${token}`);
};

/* End of auth requests */
