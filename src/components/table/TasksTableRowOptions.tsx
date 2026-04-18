import type { ProjectRole } from "@/lib/apiTypes";
import { MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type RowOptionsProps = {
    projectRole: ProjectRole;
    creatorId: string;
    userId: string;
    onEditClick: (opt: "EDIT" | "DELETE") => void;
};

function TasksTableRowOptions({
    projectRole,
    onEditClick,
    creatorId,
    userId,
}: RowOptionsProps) {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className='p-1 hover:bg-brand-gray/50 rounded
                 transition-colors cursor-pointer'>
                    <MoreVertical size={20} className='text-brand-gray' />
                </DropdownMenuTrigger>

                <DropdownMenuContent className='bg-brand-sidebar border-nav-border text-brand-primary'>
                    <DropdownMenuItem
                        className='cursor-pointer'
                        onClick={() => onEditClick("EDIT")}>
                        <span>Edit</span>
                    </DropdownMenuItem>

                    {(projectRole === "OWNER" || creatorId === userId) && (
                        <DropdownMenuItem
                            className='cursor-pointer text-red-500 hover:text-red-700'
                            onClick={() => onEditClick("DELETE")}>
                            <span>Delete</span>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default TasksTableRowOptions;
