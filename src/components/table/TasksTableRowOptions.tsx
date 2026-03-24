import type { ProjectRole } from "@/lib/apiTypes";
import type { Task } from "@/lib/types";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import DeleteModal from "../modal/DeleteModal";
import EditTaskModal from "../modal/EditTaskModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type RowOptionsProps = {
    projectId: string;
    projectRole: ProjectRole;
    task: Task;
    projectMembers: {
        role: ProjectRole;
        joinedAt: string;
        user: {
            id: string;
            firstName: string | null;
            lastName: string | null;
        };
    }[];
};

function TasksTableRowOptions({
    projectId,
    projectRole,
    task,
    projectMembers,
}: RowOptionsProps) {
    const [activeModal, setActiveModal] = useState<"edit" | "delete" | null>(
        null
    );

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className='p-1 hover:bg-brand-gray/50 rounded transition-colors cursor-pointer'>
                    <MoreVertical size={20} className='text-brand-gray' />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuItem
                        className='cursor-pointer'
                        onClick={() => setActiveModal("edit")}>
                        <span>Edit</span>
                    </DropdownMenuItem>

                    {projectRole === "OWNER" && (
                        <DropdownMenuItem
                            className='cursor-pointer text-red-500 hover:text-red-700'
                            onClick={() => setActiveModal("delete")}>
                            <span>Delete</span>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <EditTaskModal
                projectId={projectId}
                projectMembers={projectMembers}
                task={task}
                isOpen={activeModal === "edit"}
                onClose={() => setActiveModal(null)}
            />

            <DeleteModal
                taskId={task.id}
                isOpen={activeModal === "delete"}
                onClose={() => setActiveModal(null)}
            />
        </>
    );
}

export default TasksTableRowOptions;
