import CreateProjectModal from "@/components/modal/CreateProjectModal";
import { createContext, useContext, useState, type ReactNode } from "react";

type ContextType = {
    openCreateProject: () => void;
    closeCreateProject: () => void;
    isCreateProjectOpen: boolean;
};

const CreateProjectModalContext = createContext<ContextType | undefined>(
    undefined
);

export function CreateProjectModalProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

    const openCreateProject = () => setIsCreateProjectOpen(true);
    const closeCreateProject = () => setIsCreateProjectOpen(false);

    return (
        <CreateProjectModalContext.Provider
            value={{
                openCreateProject,
                closeCreateProject,
                isCreateProjectOpen,
            }}>
            {children}
            <CreateProjectModal
                openNewProject={isCreateProjectOpen}
                setOpenNewProject={setIsCreateProjectOpen}
            />
        </CreateProjectModalContext.Provider>
    );
}

export function useCreateProjectModal() {
    const ctx = useContext(CreateProjectModalContext);
    if (!ctx)
        throw new Error(
            "useCreateProjectModal must be used within CreateProjectModalProvider"
        );
    return ctx;
}
