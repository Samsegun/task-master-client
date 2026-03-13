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
        dueDate: string;
    }[];
};

// {
//     id: 'cmi7wnluz0008nmjkown14te1',
//     name: 'Marketing Campaign',
//     description: 'Q1 2024 marketing strategy and execution',
//     status: 'COMPLETED',
//     ownerId: 'cmi7wnlu90000nmjkakb024yd',
//     createdAt: 2025-11-20T20:50:04.524Z,
//     updatedAt: 2025-11-20T20:50:04.524Z,
//     owner: { id: 'cmi7wnlu90000nmjkakb024yd', email: 'alice@example.com' },
//     _count: { members: 2 },
//     completedTasks: 2,
//     totalTasks: 3,
//     progress: 67,
//     dueDate: null
//   },
