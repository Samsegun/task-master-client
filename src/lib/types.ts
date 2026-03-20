export type ProjectStatus = "ACTIVE" | "COMPLETED" | "ARCHIVED";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type Statuses = "all" | ProjectStatus | TaskStatus;

export interface Task {
    id: string;
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    assignee: {
        name: string;
        avatar?: string;
    } | null;
}

export interface Member {
    id: string;
    name: string;
    email: string;
    role: "OWNER" | "MEMBER";
    avatar?: string;
}

export interface GetDataParams {
    limit?: number;
    sort?: string;
}

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
