type Role = "USER" | "MODERATOR" | "ADMIN" | "SUPER_ADMIN";

type ProjectStatus = "ACTIVE" | "COMPLETED" | "ARCHIVED";

type ProjectRole = "OWNER" | "MEMBER";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

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

// user tasks across all projects
export type MyTasks = {
    success: boolean;
    tasks: {
        assigneeId: string;
        completedAt: boolean | null;
        createdAt: string;
        creator: { id: string; email: string };
        creatorId: string;
        description: string;
        dueDate: string | null;
        id: string;
        priority: TaskPriority;
        project: { id: string; name: string };
        projectId: string;
        status: TaskStatus;
        title: string;
        updatedAt: string;
    }[];
};

// tasks under a project
export type Tasks = {
    success: boolean;
    tasks: {
        id: string;
        title: string;
        status: TaskStatus;
        priority: TaskPriority;
        assignee: { firstName: string; lastName: string } | null;
        assigneeId: string;
        dueDate: string | null;
    }[];
};

export type ProjectMembers = {
    success: boolean;
    projectMembers: {
        id: string;
        projectId: string;
        user: {
            id: string;
            firstName: string;
            lastName: string;
        };
        role: ProjectRole;
        joinedAt: string;
    }[];
};

export type Projects = {
    success: boolean;
    projects: {
        id: string;
        name: string;
        description: string;
        status: ProjectStatus;
        ownerId: string;
        createdAt: string;
        updatedAt: string;
        owner: { id: string; email: string };
        _count: { members: number };
        completedTasks: number;
        totalTasks: number;
        progress: number;
        dueDate: string | null;
    }[];
};

export type Project = {
    success: boolean;
    project: {
        id: string;
        name: string;
        description: string;
        status: ProjectStatus;
        dueDate: string | null;
        totalMembers: number;
        progress: number;
    };
};

export type CreateProject = {
    success: boolean;
    message: string;
    project: {
        id: string;
        name: string;
        description?: string;
        status: ProjectStatus;
        ownerId: string;
        createdAt: string;
        updatedAt: string;
    };
};
