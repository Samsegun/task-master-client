import type { TaskStatus } from "@/lib/types";
import { CheckCircle, Circle, Clock } from "lucide-react";

function StatusIcon(status: TaskStatus) {
    switch (status) {
        case "DONE":
            return <CheckCircle className='text-task-completed' size={20} />;
        case "IN_PROGRESS":
            return <Clock className='text-task-progress' size={20} />;
        case "TODO":
            return <Circle className='text-task-todo' size={20} />;
    }
}

export default StatusIcon;
