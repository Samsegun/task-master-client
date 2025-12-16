export type ProjectStatus = "ACTIVE" | "COMPLETED" | "ARCHIVED";

export interface Project {
    id: string;
    name: string;
    description?: string;
    status: ProjectStatus;
    progress: number;
    dueDate: string;
    memberCount: number;
    completedTasks: number;
    totalTasks: number;
    owner: {
        name: string;
        email: string;
    };
}

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

// export interface Project {
//     id: string;
//     name: string;
//     description: string;
//     status: "ACTIVE" | "COMPLETED" | "ARCHIVED";
//     progress: number;
//     dueDate: string;
//     owner: {
//         name: string;
//         email: string;
//     };
// }
