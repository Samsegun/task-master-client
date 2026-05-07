import type { ProjectRole } from "@/lib/apiTypes";
import type { ProjectStatus } from "@/lib/types";
import { useModalStore } from "@/store/useModalStore";
import { MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type ProjectOptionsProps = {
    userProjectDetails: {
        projectId: string;
        projectName: string;
        projectRole: ProjectRole;
        projectStatus: ProjectStatus;
        projectDescription?: string;
    };
};

const markLabels: { label: string; value: ProjectStatus }[] = [
    { label: "Mark as Completed", value: "COMPLETED" },
    { label: "Mark as Archived", value: "ARCHIVED" },
    { label: "Mark as Active", value: "ACTIVE" },
];

function ProjectOptions({
    userProjectDetails,
}: {
    userProjectDetails: ProjectOptionsProps["userProjectDetails"];
}) {
    const openModal = useModalStore(state => state.openModal);

    const {
        projectId,
        projectName,
        projectRole,
        projectStatus,
        projectDescription,
    } = userProjectDetails;
    const modalParams = {
        projectId,
        projectName,
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='hover:bg-brand-gray/30 p-2 rounded-md cursor-pointer transition-colors'>
                <MoreVertical size={25} />
            </DropdownMenuTrigger>

            <DropdownMenuContent className='bg-brand-sidebar border-nav-border text-brand-primary space-y-2'>
                {projectRole === "OWNER" && (
                    <>
                        <DropdownMenuItem
                            className='cursor-pointer'
                            onClick={() =>
                                openModal("editProject", {
                                    projectId,
                                    projectName,
                                    projectStatus,
                                    projectDescription,
                                })
                            }>
                            <span>Edit Project</span>
                        </DropdownMenuItem>

                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                Mark Project
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent className='bg-brand-sidebar border-nav-border text-brand-primary space-y-2'>
                                    {markLabels.map(mark => (
                                        <DropdownMenuItem
                                            key={mark.value}
                                            className='cursor-pointer'
                                            onClick={() =>
                                                openModal("markProject", {
                                                    ...modalParams,
                                                    projectStatus: mark.value,
                                                })
                                            }>
                                            <span>{mark.label}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </>
                )}

                <DropdownMenuItem
                    className='cursor-pointer text-destructive'
                    onClick={() =>
                        openModal("leaveProject", { ...modalParams })
                    }>
                    <span>Leave Project</span>
                </DropdownMenuItem>

                {projectRole === "OWNER" && (
                    <DropdownMenuItem
                        className='cursor-pointer text-destructive'
                        onClick={() =>
                            openModal("deleteProject", { ...modalParams })
                        }>
                        <span>Delete Project</span>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ProjectOptions;
