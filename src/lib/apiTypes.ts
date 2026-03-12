type Role = "USER" | "MODERATOR" | "ADMIN" | "SUPER_ADMIN";

type ProjectStatus = "ACTIVE" | "COMPLETED" | "ARCHIVED";

type ProjectRole = "OWNER" | "MEMBER";

type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type RegisterUser = {
    success: boolean;
    message: string;
    user: {
        id: string;
        email: string;
        isVerified: boolean;
    };
};

export type LoginUser = {
    success: boolean;
    user: {
        id: string;
        email: string;
        username: string;
        role: Role;
        isVerified: boolean;
    };
};

export type LogoutUser = Omit<RegisterUser, "user">;

export type VerifyEmail = {
    success: boolean;
    message: string;
    user: {
        id: string;
        email: string;
        role: Role;
        isVerified: boolean;
        verificationToken: string;
    };
};

export type ForgotPassword = Omit<RegisterUser, "user">;

export type ResetPassword = Omit<RegisterUser, "user">;

export type UserCredentials = {
    email: string;
    password: string;
};

export type ResetPasswordCredentials = {
    token: string;
    password: string;
    email: string;
};

export type AuthStatus = {
    success: boolean;
    data: {
        id: string;
        email: string;
        username: string;
        role: Role;
        isVerified: boolean;
    };
};

export type MyTasks = {
    success: boolean;
    tasks: {
        assigneeId: string;
        completedAt: boolean | null;
        createdAt: string;
        creator: { id: string; email: string };
        creatorId: string;
        description: string;
        dueDate: string;
        id: string;
        priority: TaskPriority;
        project: { id: string; name: string };
        projectId: string;
        status: TaskStatus;
        title: string;
        updatedAt: string;
    }[];
};
