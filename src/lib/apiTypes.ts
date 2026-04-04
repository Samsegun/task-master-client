type Role = "USER" | "MODERATOR" | "ADMIN" | "SUPER_ADMIN";

export type ProjectStatus = "ACTIVE" | "COMPLETED" | "ARCHIVED";

export type ProjectRole = "OWNER" | "MEMBER";

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

export type Tasks = {
    success: boolean;
    tasks: Task["task"][];
    userId: string;
};

// tasks under a project
export type Task = {
    task: {
        id: string;
        title: string;
        description: string | null;
        dueDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        completedAt: Date;
        priority: TaskPriority;
        status: TaskStatus;
        assignee: {
            id: string | null;
            firstName: string | null;
            lastName: string | null;
            username: string | null;
        };
        creator: {
            id: string;
            firstName: string | null;
            lastName: string | null;
            username: string | null;
        };
        project: {
            id: string;
            name: string;
            members: {
                role: ProjectRole;
                joinedAt: Date;
                user: {
                    id: string;
                    firstName: string | null;
                    lastName: string | null;
                    username: string | null;
                };
            }[];
        };
    };
    userId: string;
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
        projectRole: ProjectRole;
        dueDate: string | null;
        members: {
            role: ProjectRole;
            joinedAt: string;
            user: {
                id: string;
                firstName: string | null;
                lastName: string | null;
                username: string | null;
            };
        }[];
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
    };
};

export type AddProjectMember = {
    success: boolean;
    user: {
        id: string;
        email: string;
    };
};

export type UpdateMemberRole = {
    success: boolean;
    updatedMember:
        | ({
              user: {
                  id: string;
                  email: string;
              };
          } & {
              id: string;
              projectId: string;
              userId: string;
              role: ProjectRole;
              joinedAt: Date;
          })
        | null;
};

export type CreateTask = {
    success: boolean;
    message: string;
    task: {
        id: string;
        title: string;
        projectId: string;
    };
};

export type UpdateTask = {
    success: boolean;
    message: string;
    task: {
        id: string;
        title: string;
        projectId: string;
    };
};

export type DeleteTask = {
    success: boolean;
    message: string;
};
