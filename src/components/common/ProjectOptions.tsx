import { useGlobalModals } from "@/hooks/useGlobalModals";
import type { ProjectRole } from "@/lib/apiTypes";
import { MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type ProjectOptionsProps = {
    userProjectDetails: {
        projectId: string;
        projectName: string;
        projectRole: ProjectRole;
    };
};

function ProjectOptions({
    userProjectDetails,
}: {
    userProjectDetails: ProjectOptionsProps["userProjectDetails"];
}) {
    const { openLeaveProject, openDeleteProject } = useGlobalModals();

    const { projectId, projectName, projectRole } = userProjectDetails;
    const modalParams = {
        projectId,
        projectName,
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className=' hover:bg-brand-gray/30 p-2 rounded-md cursor-pointer transition-colors'>
                <MoreVertical size={25} />
            </DropdownMenuTrigger>

            <DropdownMenuContent className='bg-brand-sidebar border-nav-border text-brand-primary space-y-2'>
                {projectRole === "OWNER" && (
                    <DropdownMenuItem className='cursor-pointer'>
                        <span>Mark as Archived</span>
                    </DropdownMenuItem>
                )}

                <DropdownMenuItem
                    className='cursor-pointer'
                    onClick={() => openLeaveProject(modalParams)}>
                    <span>Leave Project</span>
                </DropdownMenuItem>

                {projectRole === "OWNER" && (
                    <DropdownMenuItem
                        className='cursor-pointer text-destructive'
                        onClick={() => openDeleteProject(modalParams)}>
                        <span>Delete Project</span>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ProjectOptions;
