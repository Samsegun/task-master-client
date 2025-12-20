import { Badge } from "../ui/badge";

function StatusBadge({ status }: { status: string }) {
    const variants: any = {
        // task status
        IN_PROGRESS: "bg-task-progress-bg text-task-progress",
        TODO: "bg-task-todo-bg text-task-todo",
        DONE: "bg-green-500/10 text-green-500",

        // task priority
        LOW: "bg-gray-500/10 text-gray-400",
        MEDIUM: "bg-orange-500/10 text-orange-500",
        HIGH: "bg-red-500/10 text-red-500",

        // project status
        ACTIVE: "bg-project-active-bg text-project-active",
        COMPLETED: "bg-project-completed-bg text-project-completed",
        ARCHIVED: "bg-project-archived-bg text-project-archived",
    };

    return (
        <Badge
            className={`border-none rounded-full px-3 py-1 font-medium text-xs ${variants[status]}`}>
            {status.replaceAll("_", " ")}
        </Badge>
    );
}

export default StatusBadge;
