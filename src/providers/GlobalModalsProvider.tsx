import AddMemberModal from "@/components/modal/AddMemberModal";
import CreateTaskModal from "@/components/modal/CreateTaskModal";
import DeleteMemberModal from "@/components/modal/DeleteMemberModal";
import DeleteProjectModal from "@/components/modal/DeleteProjectModal";
import DeleteTaskModal from "@/components/modal/DeleteTaskModal";
import EditMemberModal from "@/components/modal/EditMemberModal";
import EditTaskModal from "@/components/modal/EditTaskModal";
import { GlobalModalsContext } from "@/hooks/useGlobalModals";
import type { Task } from "@/lib/apiTypes";
import type { EditPayload, MemberInfo, MemberShape } from "@/lib/types";
import { useState, type ReactNode } from "react";

function GlobalModalsProvider({ children }: { children: ReactNode }) {
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
    const [deleteProject, setDeleteProject] = useState<{
        projectId: string;
        projectName: string;
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
    const openDeleteProject = (project: {
        projectId: string;
        projectName: string;
    }) => setDeleteProject(project);

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
                openDeleteProject,
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

            {deleteProject && (
                <DeleteProjectModal
                    project={deleteProject}
                    isOpen={true}
                    onClose={() => setDeleteProject(null)}
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
                    isOpen={isEditMemberOpen}
                    onClose={() => setEditMemberOpen(false)}
                />
            )}

            {editableMember?.userToBeEdited.user && (
                <DeleteMemberModal
                    deleteMemberInfo={editableMember}
                    isOpen={isRemoveMemberOpen}
                    onClose={() => setRemoveMemberOpen(false)}
                />
            )}
        </GlobalModalsContext.Provider>
    );
}

export default GlobalModalsProvider;
