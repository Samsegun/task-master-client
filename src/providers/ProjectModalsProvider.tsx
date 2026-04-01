import AddMemberModal from "@/components/modal/AddMemberModal";
import CreateTaskModal from "@/components/modal/CreateTaskModal";
import DeleteMemberModal from "@/components/modal/DeleteMemberModal";
import DeleteTaskModal from "@/components/modal/DeleteTaskModal";
import EditMemberModal from "@/components/modal/EditMemberModal";
import EditTaskModal from "@/components/modal/EditTaskModal";
import type { ProjectRole } from "@/lib/apiTypes";
import type { MemberShape, Task } from "@/lib/types";
import { createContext, useContext, useState, type ReactNode } from "react";

type MemberInfo = {
    userToBeEdited: MemberShape;
    projectName: string;
    action: "EDIT" | "REMOVE";
    memberRoleToEdit?: ProjectRole;
};

type ProjectModalsContextType = {
    openCreate: () => void;
    openEdit: (task: Task) => void;
    openDelete: (task: Task) => void;
    openAddMember: () => void;
    handleProjectMember: (memberInfo: MemberInfo) => void;
};

const ProjectModalsContext = createContext<
    ProjectModalsContextType | undefined
>(undefined);

export const ProjectModalsProvider = ({
    children,
    projectId,
    projectMembers,
}: {
    children: ReactNode;
    projectId: string;
    projectMembers: MemberShape[];
}) => {
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [isAddMemberOpen, setAddMemberOpen] = useState(false);
    const [isRemoveMemberOpen, setRemoveMemberOpen] = useState(false);
    const [isEditMemberOpen, setEditMemberOpen] = useState(false);
    const [editableMember, setEditableMember] = useState<MemberInfo | null>(
        null
    );

    const [editTask, setEditTask] = useState<Task | null>(null);
    const [deleteTask, setDeleteTask] = useState<Task | null>(null);

    const openCreate = () => setCreateOpen(true);
    const openEdit = (task: Task) => setEditTask(task);
    const openDelete = (task: Task) => setDeleteTask(task);
    const openAddMember = () => setAddMemberOpen(true);
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
        <ProjectModalsContext.Provider
            value={{
                openCreate,
                openAddMember,
                openEdit,
                openDelete,
                handleProjectMember,
            }}>
            {children}

            {/* single mounted instances */}
            <CreateTaskModal
                projectId={projectId}
                projectMembers={projectMembers}
                openNewTask={isCreateOpen}
                setOpenNewTask={setCreateOpen}
            />

            <AddMemberModal
                projectId={projectId}
                isOpen={isAddMemberOpen}
                onClose={() => setAddMemberOpen(false)}
            />

            {editableMember?.userToBeEdited.user && (
                <EditMemberModal
                    editMemberInfo={editableMember}
                    memberRoleToEdit={editableMember.memberRoleToEdit!}
                    projectId={projectId}
                    isOpen={isEditMemberOpen}
                    onClose={() => setEditMemberOpen(false)}
                />
            )}

            {editableMember?.userToBeEdited.user && (
                <DeleteMemberModal
                    projectId={projectId}
                    deleteMemberInfo={editableMember}
                    isOpen={isRemoveMemberOpen}
                    onClose={() => setRemoveMemberOpen(false)}
                />
            )}

            {editTask && (
                <EditTaskModal
                    projectId={projectId}
                    projectMembers={projectMembers}
                    task={editTask}
                    isOpen={!!editTask}
                    onClose={() => setEditTask(null)}
                />
            )}

            {deleteTask && (
                <DeleteTaskModal
                    task={{ id: deleteTask.id, title: deleteTask.title }}
                    projectId={projectId}
                    isOpen={!!deleteTask}
                    onClose={() => setDeleteTask(null)}
                />
            )}
        </ProjectModalsContext.Provider>
    );
};

export const useProjectModals = () => {
    const ctx = useContext(ProjectModalsContext);
    if (!ctx)
        throw new Error(
            "useProjectModals must be used inside ProjectModalsProvider"
        );
    return ctx;
};
