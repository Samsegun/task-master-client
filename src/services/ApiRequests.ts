import type {
    AddMemberDetails,
    GetDataParams,
    ProjectDetails,
    TaskDetails,
} from "@/lib/types";
import type {
    AddProjectMember,
    AuthStatus,
    CreateProject,
    CreateTask,
    DeleteTask,
    ForgotPassword,
    LoginUser,
    LogoutUser,
    // MyTasks,
    Project,
    ProjectMembers,
    ProjectRole,
    Projects,
    RegisterUser,
    ResetPassword,
    Tasks,
    UpdateTask,
    VerifyEmail,
} from "../lib/apiTypes";
import axiosInstance from "./AxiosConfig";

const AUTH = "/auth";
const V1 = "/v1";

/* start of auth requests */
export const registerUser = (
    email: string,
    password: string,
    username: string
) => {
    return axiosInstance.post<RegisterUser>(`${AUTH}/register`, {
        email,
        password,
        username,
    });
};

export const loginUser = (emailOrusername: string, password: string) => {
    return axiosInstance.post<LoginUser>(`${AUTH}/login`, {
        emailOrusername,
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

export const createProject = (payLoad: ProjectDetails) => {
    return axiosInstance.post<CreateProject>(`${V1}/projects`, payLoad);
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

    return axiosInstance.get<Tasks>(url);
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

export const createTask = (projectId: string, payLoad: TaskDetails) => {
    return axiosInstance.post<CreateTask>(
        `${V1}/projects/${projectId}/tasks`,
        payLoad
    );
};

export const updateTask = (
    projectId: string,
    taskId: string,
    payLoad: TaskDetails
) => {
    return axiosInstance.patch<UpdateTask>(
        `${V1}/projects/${projectId}/tasks/${taskId}`,
        payLoad
    );
};

export const deleteTask = (projectId: string, taskId: string) => {
    return axiosInstance.delete<DeleteTask>(
        `${V1}/projects/${projectId}/tasks/${taskId}`
    );
};
/* end of task requests */

/* start of project member requests */
export const getProjectMembers = (projectId: string) => {
    return axiosInstance.get<ProjectMembers>(
        `${V1}/projects/${projectId}/members`
    );
};

export const addProjectMember = (
    projectId: string,
    payLoad: AddMemberDetails
) => {
    return axiosInstance.post<AddProjectMember>(
        `${V1}/projects/${projectId}/members`,
        payLoad
    );
};

export const removeProjectMember = (
    projectId: string,
    userIdToRemove: string
) => {
    return axiosInstance.delete<AddProjectMember>(
        `${V1}/projects/${projectId}/members/${userIdToRemove}`
    );
};

export const updateMemberRole = (
    projectId: string,
    userIdToUpdate: string,
    role: ProjectRole
) => {
    return axiosInstance.patch<AddProjectMember>(
        `${V1}/projects/${projectId}/members/${userIdToUpdate}`,
        { role }
    );
};

/* end of project member requests */
