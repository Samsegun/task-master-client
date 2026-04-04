import { createContext, useContext, useState, type ReactNode } from "react";
// import { useQueryClient } from "@tanstack/react-query";
import AddMemberModal from "@/components/modal/AddMemberModal";
import CreateTaskModal from "@/components/modal/CreateTaskModal";
import DeleteTaskModal from "@/components/modal/DeleteTaskModal";
import EditTaskModal from "@/components/modal/EditTaskModal";
import type { MemberShape } from "@/lib/types";
// import { getProjectMembers } from "@/services/ApiRequests";
import DeleteMemberModal from "@/components/modal/DeleteMemberModal";
import EditMemberModal from "@/components/modal/EditMemberModal";
import type { ProjectRole, Task } from "@/lib/apiTypes";

type EditPayload = {
    //   projectId: string;
    task: Task["task"];
    //   projectMembers?: MemberShape[] | null;
};

type MemberInfo = {
    userToBeEdited: MemberShape;
    project: { name: string; id: string };
    action: "EDIT" | "REMOVE";
    memberRoleToEdit?: ProjectRole;
};

type GlobalModalsContextType = {
    openCreate: (opts: {
        projectId: string;
        projectMembers?: MemberShape[];
    }) => void;
    //   openEdit: (opts: EditPayload) => Promise<void>;
    openEdit: (opts: EditPayload) => void;
    openDelete: (opts: { projectId: string; task: Task["task"] }) => void;
    openAddMember: (projectId: string) => void;
    handleProjectMember: (memberInfo: MemberInfo) => void;
};

const GlobalModalsContext = createContext<GlobalModalsContextType | undefined>(
    undefined
);

export const GlobalModalsProvider = ({ children }: { children: ReactNode }) => {
    //   const qc = useQueryClient();

    const [createState, setCreateState] = useState<{
        projectId: string;
        projectMembers?: MemberShape[];
    } | null>(null);
    const [editState, setEditState] = useState<EditPayload["task"] | null>(
        null
    );
    const [deleteState, setDeleteState] = useState<{
        projectId: string;
        task: Task["task"];
    } | null>(null);
    const [addMemberProjectId, setAddMemberProjectId] = useState<string | null>(
        null
    );
    const [isRemoveMemberOpen, setRemoveMemberOpen] = useState(false);
    const [isEditMemberOpen, setEditMemberOpen] = useState(false);
    const [editableMember, setEditableMember] = useState<MemberInfo | null>(
        null
    );

    const openCreate = (opts: {
        projectId: string;
        projectMembers?: MemberShape[];
    }) => {
        setCreateState(opts);
    };

    const openEdit = (opts: EditPayload) => setEditState(opts.task);
    const openDelete = (opts: { projectId: string; task: Task["task"] }) =>
        setDeleteState({ ...opts, task: opts.task });
    const openAddMember = (projectId: string) =>
        setAddMemberProjectId(projectId);

    const handleProjectMember = (memberInfo: MemberInfo) => {
        if (memberInfo.action === "REMOVE") {
            setRemoveMemberOpen(true);
        }

        if (memberInfo.action === "EDIT") {
            setEditMemberOpen(true);
        }

        setEditableMember(memberInfo);
    };

    return (
        <GlobalModalsContext.Provider
            value={{
                openCreate,
                openEdit,
                openDelete,
                openAddMember,
                handleProjectMember,
            }}>
            {children}

            {/* single mounted modal instances */}
            {createState && (
                <CreateTaskModal
                    projectId={createState.projectId}
                    projectMembers={createState.projectMembers ?? []}
                    openNewTask={true}
                    setOpenNewTask={v => !v && setCreateState(null)}
                />
            )}

            {editState && (
                <EditTaskModal
                    projectId={editState.project.id}
                    projectMembers={editState.project.members ?? []}
                    task={editState}
                    isOpen={true}
                    onClose={() => setEditState(null)}
                />
            )}

            {deleteState && (
                <DeleteTaskModal
                    task={{
                        id: deleteState.task.id,
                        title: deleteState.task.title,
                    }}
                    projectId={deleteState.projectId}
                    isOpen={true}
                    onClose={() => setDeleteState(null)}
                />
            )}

            {addMemberProjectId && (
                <AddMemberModal
                    projectId={addMemberProjectId}
                    isOpen={true}
                    onClose={() => setAddMemberProjectId(null)}
                />
            )}

            {editableMember?.userToBeEdited.user && (
                <EditMemberModal
                    editMemberInfo={editableMember}
                    memberRoleToEdit={editableMember.memberRoleToEdit!}
                    // projectId={projectId}
                    isOpen={isEditMemberOpen}
                    onClose={() => setEditMemberOpen(false)}
                />
            )}

            {editableMember?.userToBeEdited.user && (
                <DeleteMemberModal
                    // projectId={projectId}
                    deleteMemberInfo={editableMember}
                    isOpen={isRemoveMemberOpen}
                    onClose={() => setRemoveMemberOpen(false)}
                />
            )}
        </GlobalModalsContext.Provider>
    );
};

export const useGlobalModals = () => {
    const ctx = useContext(GlobalModalsContext);
    if (!ctx)
        throw new Error(
            "useGlobalModals must be used inside GlobalModalsProvider"
        );
    return ctx;
};
