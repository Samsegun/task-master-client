import type { Task } from "@/lib/apiTypes";
import type {
    EditPayload,
    MemberInfo,
    MemberShape,
    ProjectStatus,
} from "@/lib/types";
import { createContext, useContext } from "react";

type GlobalModalsContextType = {
    openCreate: (opts: {
        projectId: string;
        projectMembers?: MemberShape[];
    }) => void;
    openEdit: (opts: EditPayload) => void;
    openDelete: (opts: { projectId: string; task: Task["task"] }) => void;
    openDeleteProject: (project: {
        projectId: string;
        projectName: string;
    }) => void;
    openLeaveProject: (project: {
        projectId: string;
        projectName: string;
    }) => void;
    openMarkProject: (project: {
        projectId: string;
        projectName: string;
        projectStatus: ProjectStatus;
    }) => void;
    openAddMember: (projectId: string) => void;
    handleProjectMember: (memberInfo: MemberInfo) => void;
};

export const GlobalModalsContext = createContext<
    GlobalModalsContextType | undefined
>(undefined);

export const useGlobalModals = () => {
    const ctx = useContext(GlobalModalsContext);
    if (!ctx)
        throw new Error(
            "useGlobalModals must be used inside GlobalModalsProvider"
        );
    return ctx;
};
