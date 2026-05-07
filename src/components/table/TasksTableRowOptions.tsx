import type { ProjectRole, Task } from "@/lib/apiTypes";
import type { MemberShape } from "@/lib/types";
import { useModalStore } from "@/store/useModalStore";
import { MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type RowOptionsProps = {
    modalData?: { task: Task["task"]; projectMembers?: MemberShape[] };
    projectRole: ProjectRole;
    creatorId: string;
    userId: string;
};

function TasksTableRowOptions({
    modalData,
    projectRole,
    // onEditClick,
    creatorId,
    userId,
}: RowOptionsProps) {
    const openModal = useModalStore(state => state.openModal);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className='p-1 hover:bg-brand-gray/50 rounded
                 transition-colors cursor-pointer'>
                <MoreVertical size={20} className='text-brand-gray' />
            </DropdownMenuTrigger>

            <DropdownMenuContent className='bg-brand-sidebar border-nav-border text-brand-primary'>
                <DropdownMenuItem
                    className='cursor-pointer'
                    onClick={() =>
                        openModal("editTask", {
                            task: modalData?.task,
                            projectMembers: modalData?.projectMembers,
                        })
                    }>
                    <span>Edit</span>
                </DropdownMenuItem>

                {(projectRole === "OWNER" || creatorId === userId) && (
                    <DropdownMenuItem
                        className='cursor-pointer text-red-500 hover:text-red-700'
                        onClick={() =>
                            openModal("deleteTask", {
                                task: modalData?.task,
                                projectId: modalData?.task?.project?.id,
                            })
                        }>
                        <span>Delete</span>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default TasksTableRowOptions;
