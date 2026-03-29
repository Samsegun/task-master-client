import CreateTaskModal from "@/components/modal/CreateTaskModal";
import DeleteModal from "@/components/modal/DeleteModal";
import EditTaskModal from "@/components/modal/EditTaskModal";
import type { ProjectRole } from "@/lib/apiTypes";
import type { Task } from "@/lib/types";
import { createContext, useContext, useState, type ReactNode } from "react";

type MemberShape = {
    role: ProjectRole;
    joinedAt: string;
    user: { id: string; firstName: string | null; lastName: string | null };
};

type TaskModalsContextType = {
    openCreate: () => void;
    openEdit: (task: Task) => void;
    openDelete: (task: Task) => void;
};

const TaskModalsContext = createContext<TaskModalsContextType | undefined>(
    undefined
);

export const TaskModalsProvider = ({
    children,
    projectId,
    projectMembers,
}: {
    children: ReactNode;
    projectId: string;
    projectMembers: MemberShape[];
}) => {
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [editTask, setEditTask] = useState<Task | null>(null);
    const [deleteTask, setDeleteTask] = useState<Task | null>(null);

    const openCreate = () => setCreateOpen(true);
    const openEdit = (task: Task) => setEditTask(task);
    const openDelete = (task: Task) => setDeleteTask(task);

    return (
        <TaskModalsContext.Provider
            value={{ openCreate, openEdit, openDelete }}>
            {children}

            {/* single mounted instances */}
            <CreateTaskModal
                projectId={projectId}
                projectMembers={projectMembers}
                openNewTask={isCreateOpen}
                setOpenNewTask={setCreateOpen}
            />

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
                <DeleteModal
                    task={{ id: deleteTask.id, title: deleteTask.title }}
                    projectId={projectId}
                    isOpen={!!deleteTask}
                    onClose={() => setDeleteTask(null)}
                />
            )}
        </TaskModalsContext.Provider>
    );
};

export const useTaskModals = () => {
    const ctx = useContext(TaskModalsContext);
    if (!ctx)
        throw new Error("useTaskModals must be used inside TaskModalsProvider");
    return ctx;
};
