import { Badge } from "../ui/badge";

function StatusBadge({ status }: { status: string }) {
    const variants: any = {
        // task status
        IN_PROGRESS: "bg-task-progress-bg text-task-progress",
        TODO: "bg-task-todo-bg text-task-todo",
        Done: "bg-task-completed-bg text-completed",

        // task priority
        LOW: "bg-task-low-bg text-task-low",
        MEDIUM: "bg-task-medium-bg text-task-medium",
        HIGH: "bg-task-high-bg text-task-high",

        // project status
        ACTIVE: "bg-project-active-bg text-project-active",
        COMPLETED: "bg-project-completed-bg text-project-completed",
        ARCHIVED: "bg-project-archived-bg text-project-archived",
    };

    return (
        <Badge
            className={`border-none rounded-full px-4 py-1 font-bold ${variants[status]}`}>
            {status.replaceAll("_", " ")}
        </Badge>
    );
}

export default StatusBadge;
