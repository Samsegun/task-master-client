import type { GetDataParams } from "@/lib/types";
import type {
    AuthStatus,
    ForgotPassword,
    LoginUser,
    LogoutUser,
    MyTasks,
    Project,
    ProjectMembers,
    Projects,
    RegisterUser,
    ResetPassword,
    Tasks,
    VerifyEmail,
} from "../lib/apiTypes";
import axiosInstance from "./AxiosConfig";

const AUTH = "/auth";
const V1 = "/v1";

/* start of auth requests */
export const registerUser = (email: string, password: string) => {
    return axiosInstance.post<RegisterUser>(`${AUTH}/register`, {
        email,
        password,
    });
};

export const loginUser = (email: string, password: string) => {
    return axiosInstance.post<LoginUser>(`${AUTH}/login`, {
        email,
        password,
    });
};

export const logoutUser = () => {
    return axiosInstance.post<LogoutUser>(`${AUTH}/logout`);
};

export const forgotPassword = (email: string) => {
    return axiosInstance.post<ForgotPassword>(`${AUTH}/forgot-password`, {
        email,
    });
};

export const resetPassword = (token: string, password: string) => {
    return axiosInstance.post<ResetPassword>(`${AUTH}/reset-password`, {
        token,
        password,
    });
};

export const verifyEmail = (token: string) => {
    return axiosInstance.get<VerifyEmail>(
        `${AUTH}/verify-email?token=${token}`
    );
};

export const checkAuthStatus = () => {
    return axiosInstance.get<AuthStatus>(`${V1}/users/me`);
};
/* end of auth requests */

/* start of project requests */
export const getProjects = (params?: GetDataParams) => {
    const queryParams = new URLSearchParams();

    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const queryString = queryParams.toString();
    const url = queryString
        ? `${V1}/projects?${queryString}`
        : `${V1}/projects`;

    return axiosInstance.get<Projects>(url);
};

export const getProject = (projectId: string) => {
    return axiosInstance.get<Project>(`${V1}/projects/${projectId}`);
};

/* end of project requests */

/* start of task requests */

// user tasks across all projects
export const getMyTasks = (params?: GetDataParams) => {
    const queryParams = new URLSearchParams();

    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.sort) queryParams.append("sort", params.sort);

    const queryString = queryParams.toString();
    const url = queryString
        ? `${V1}/users/me/tasks?${queryString}`
        : `${V1}/users/me/tasks`;

    return axiosInstance.get<MyTasks>(url);
};

// tasks under a project
export const getTasks = (projectId: string, params?: GetDataParams) => {
    const queryParams = new URLSearchParams();

    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.sort) queryParams.append("sort", params.sort);

    const queryString = queryParams.toString();
    const url = queryString
        ? `${V1}/projects/${projectId}/tasks?${queryString}`
        : `${V1}/projects/${projectId}/tasks`;

    return axiosInstance.get<Tasks>(url);
};

/* end of task requests */

/* start of project member requests */
export const getProjectMembers = (projectId: string) => {
    return axiosInstance.get<ProjectMembers>(
        `${V1}/projects/${projectId}/members`
    );
};

/* end of project member requests */
