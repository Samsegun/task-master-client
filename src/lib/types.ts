import type { ProjectRole } from "./apiTypes";

export type ProjectStatus = "ACTIVE" | "COMPLETED" | "ARCHIVED";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type Statuses = "all" | ProjectStatus | TaskStatus;

export type Task = {
    id: string;
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    description: string | null;
    dueDate: string | null;
    assignee: { firstName: string; lastName: string } | null;
    assigneeId: string | null;
    creatorId: string;
};

export type Member = {
    id: string;
    name: string;
    email: string;
    role: "OWNER" | "MEMBER";
    avatar?: string;
};

export type MemberShape = {
    role: ProjectRole;
    joinedAt: string;
    user: {
        id: string;
        firstName: string | null;
        lastName: string | null;
        username: string | null;
    };
};

export type GetDataParams = {
    limit?: number;
    sort?: string;
};

export type Project = {
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
};

export type ProjectDetails = {
    name: string;
    description?: string;
};

export type TaskDetails = {
    title: string;
    description?: string;
};

export type AddMemberDetails = {
    email: string;
    role?: ProjectRole;
};
