export type ProjectStatus = "ACTIVE" | "COMPLETED" | "ARCHIVED";

export interface Project {
    id: string;
    name: string;
    status: ProjectStatus;
    progress: number;
    dueDate: string;
    memberCount: number;
    completedTasks: number;
    totalTasks: number;
}
